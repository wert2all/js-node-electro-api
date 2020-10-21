import DI from "../../lib/di/DI";
import ServerConfig from "../../server/ServerConfig";
import KeyValueStorageInterface from "../../storage/keyvalue/KeyValueStorageInterface";
import ConfigStorage from "../../storage/keyvalue/ConfigStorage";
import FileStorage from "../../storage/FileStorage";
import FileStorageConfig from "../../storage/file/FileStorageConfig";
import path from "path";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import SecretStorage from "../../storage/keyvalue/SecretStorage";
import DispatchInterface from "../../lib/dispatcher/DispatchInterface";
import EventFileUpload from "../../modules/upload/dispatch/event/EventFileUpload";
import FileUploadedObserver from "../../modules/upload/dispatch/observers/FileUploadedObserver";
import TelegramApi from "../../lib/telegram/TelegramApi";
import Dispatcher from "../../lib/dispatcher/Dispatcher";
import RendererInterface from "../../lib/renderer/RendererInterface";
import PugAdapter from "../../lib/renderer/adapter/PugAdapter";
import ImageOriginalUrl from "../../extended/images/providers/ImageOriginalUrl";
import ExpressFactory from "./ExpressFactory";
import MergeReader from "../../lib/json/MergeReader";
import ReaderDefault from "../../lib/json/ReaderDefault";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import Logger from "../../extended/logger/Logger";
import SQLLogEvent from "../../extended/logger/events/SQLLogEvent";
import ConsoleLogger from "../../lib/logger/adapters/ConsoleLogger";
import LogFormatter from "../../extended/logger/formater/LogFormatter";
import FileLogger from "../../lib/logger/adapters/FileLogger";
import AppLogEvent from "../../extended/logger/events/AppLogEvent";
import LoggerStrategy from "../../extended/LoggerStrategy";
import LogFormatterInterface from "../../lib/logger/LogFormatterInterface";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import ImagesUrlProviderManagerFactory from "../../extended/images/ImagesUrlProviderManagerFactory";
import ResizeSizesHolder from "../../modules/console/resize/size/ResizeSizesHolder";
import ResizeConfig from "../../modules/console/resize/size/ResizeConfig";
import ImagesUrlProviderMerger from "../../extended/images/ImagesUrlProviderMerger";
import ResizeDestinationPathProviderFactory from "../../modules/console/resize/path/ResizeDestinationPathProviderFactory";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";
import SQLiteReadConnection from "../../lib/db-connection/adapter/sqlite/SQLiteReadConnection";
import WriteConnectionInterface from "../../lib/db-connection/WriteConnectionInterface";
import SQLiteWriteConnection from "../../lib/db-connection/adapter/sqlite/SQLiteWriteConnection";
import EventSqlExec from "../../lib/db-connection/dispatcher/event/EventSqlExec";
import ExecSqlObserver from "../../lib/db-connection/dispatcher/ExecSqlObserver";
import TablesFactoryInterface from "../../lib/db-connection/tables/TablesFactoryInterface";
import TablesFactory from "../../lib/db-connection/tables/TablesFactory";
import UserDefinition from "../../db/definition/UserDefinition";
import UserProfileDefinition from "../../db/definition/UserProfileDefinition";
import UserFilesDefinition from "../../db/definition/UserFilesDefinition";
import ExtendedValuesDefinition from "../../db/definition/ExtendedValuesDefinition";
import MLModelLoggingDefinition from "../../db/definition/ml/MLModelLoggingDefinition";
import MLModelTrainingDefinition from "../../db/definition/ml/MLModelTrainingDefinition";
import TableCreator from "../../lib/db-connection/adapter/sqlite/TableCreator";
import QueryExecutor from "../../lib/db-connection/adapter/sqlite/QueryExecutor";
import EventSqlError from "../../lib/db-connection/dispatcher/event/EventSqlError";
import ExecSqlErrorObserver from "../../lib/db-connection/dispatcher/ExecSqlErrorObserver";

export default class DIFactory {
    /**
     *
     * @return DI
     */
    // eslint-disable-next-line max-statements
    static create(configFactory) {
        const di = DI.getInstance();
        const serverConfig = configFactory.create();
        const applicationDirectory = serverConfig.getApplicationDirectory();

        di.register(ServerConfig, serverConfig);
        di.register("Express", ExpressFactory.create(serverConfig));

        di.register(LogFormatterInterface, new LogFormatter(" | "));
        di.register(LoggerStrategy, this._getLoggers(di, serverConfig));
        di.register(LoggerInterface, new Logger(di.get(LoggerStrategy)));

        di.register(ReadConnectionInterface, new SQLiteReadConnection());
        di.register(WriteConnectionInterface, new SQLiteWriteConnection());
        di.register(
            EntityManager,
            new EntityManager(di.get(ReadConnectionInterface), di.get(WriteConnectionInterface))
        );

        di.register(
            KeyValueStorageInterface,
            new ConfigStorage(
                new MergeReader(
                    new ReaderDefault(applicationDirectory + "config.default.json"),
                    new ReaderDefault(applicationDirectory + "config.json")
                )
            )
        );

        di.register(
            FileStorage,
            new FileStorage(new FileStorageConfig(path.normalize(applicationDirectory + "data/files/")))
        );
        di.register(
            StorageConfiguration,
            new StorageConfiguration(
                new SecretStorage(
                    new MergeReader(
                        new ReaderDefault(applicationDirectory + "secret.sample.json"),
                        new ReaderDefault(applicationDirectory + "secret.json")
                    )
                ),
                di.get(KeyValueStorageInterface)
            )
        );
        di.register(
            TablesFactoryInterface,
            new TablesFactory(
                [
                    new UserDefinition(),
                    new UserProfileDefinition(),
                    new UserFilesDefinition(),
                    new ExtendedValuesDefinition(),
                    new MLModelLoggingDefinition(),
                    new MLModelTrainingDefinition(),
                ],
                new TableCreator(new QueryExecutor())
            )
        );
        di.register(
            TelegramApi,
            new TelegramApi(
                di.get(StorageConfiguration).getSecretStorage().fetch("telegram.bot.token"),
                di.get(StorageConfiguration).getSecretStorage().fetch("telegram.bot.chat")
            )
        );
        di.register(
            DispatchInterface,
            (() => {
                const observers = {};
                observers[EventFileUpload.EVENT_NAME] = [new FileUploadedObserver(di.get(TelegramApi))];
                observers[EventSqlExec.EVENT_NAME] = [new ExecSqlObserver(di.get(LoggerInterface))];
                // observers[EventSqlError.EVENT_NAME] = [
                //     new ExecSqlErrorObserver(di.get(TelegramApi), di.get(LoggerInterface)),
                // ];
                return new Dispatcher(observers);
            })()
        );
        di.get(ReadConnectionInterface).setDispatcher(di.get(DispatchInterface));
        di.get(WriteConnectionInterface).setDispatcher(di.get(DispatchInterface));

        di.register(
            RendererInterface,
            new PugAdapter(
                serverConfig.getWebserverDirectory() +
                    di.get(KeyValueStorageInterface).fetch("render.pug.template.directory") +
                    di.get(KeyValueStorageInterface).fetch("render.pug.template.name")
            )
        );

        di.register(
            ImageOriginalUrl,
            new ImageOriginalUrl(
                di.get(StorageConfiguration).getConfig(),
                new ResizeDestinationPathProviderFactory().factory()
            )
        );
        di.register(
            ResizeSizesHolder,
            new ResizeSizesHolder([
                new ResizeConfig("250x330", 250, 330, "contain", {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1,
                }),
            ])
        );
        di.register(
            ImagesUrlProviderManagerFactory,
            new ImagesUrlProviderManagerFactory(
                new ImagesUrlProviderMerger(
                    di.get(KeyValueStorageInterface),
                    new ResizeDestinationPathProviderFactory()
                ).merge(
                    {
                        original: new ImageOriginalUrl(
                            di.get(StorageConfiguration).getConfig(),
                            new ResizeDestinationPathProviderFactory().factory()
                        ),
                    },
                    di.get(ResizeSizesHolder)
                )
            )
        );
        return di;
    }

    /**
     *
     * @param {DI} di
     * @param {ServerConfig} serverConfig
     * @return {LoggerStrategy}
     * @private
     */
    static _getLoggers(di, serverConfig) {
        const loggers = {};
        const formatter = di.get(LogFormatterInterface);
        loggers[SQLLogEvent.TAG] = new FileLogger(serverConfig.getLogDirectory() + "sql.log", formatter);
        loggers[AppLogEvent.TAG] = new FileLogger(serverConfig.getLogDirectory() + "app.log", formatter);
        return new LoggerStrategy(loggers, new ConsoleLogger(formatter));
    }
}
