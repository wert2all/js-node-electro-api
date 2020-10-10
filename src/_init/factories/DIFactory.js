import DI from "../../lib/di/DI";
import ServerConfig from "../../server/ServerConfig";
import ConnectionInterface from "../../lib/db-connection/ConnectionInterface";
import SQLiteConnection from "../../lib/db-connection/adapter/SQLiteConnection";
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
import ImageUrl from "../../data/images/ImageUrl";
import ServerConfigFactory from "./ServerConfigFactory";
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

        di.register(ConnectionInterface, new SQLiteConnection(di.get(LoggerInterface)));
        di.register(EntityManager, new EntityManager(di.get(ConnectionInterface)));

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
            DispatchInterface,
            (() => {
                const observers = {};
                observers[EventFileUpload.EVENT_NAME] = [
                    new FileUploadedObserver(
                        new TelegramApi(
                            di.get(StorageConfiguration).getSecretStorage().fetch("telegram.bot.token"),
                            di.get(StorageConfiguration).getSecretStorage().fetch("telegram.bot.chat")
                        )
                    ),
                ];
                return new Dispatcher(observers);
            })()
        );

        di.register(
            RendererInterface,
            new PugAdapter(
                serverConfig.getWebserverDirectory() +
                    di.get(KeyValueStorageInterface).fetch("render.pug.template.directory") +
                    di.get(KeyValueStorageInterface).fetch("render.pug.template.name")
            )
        );

        di.register(ImageUrl, new ImageUrl(di.get(StorageConfiguration).getConfig(), di.get(FileStorage).getConfig()));
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
