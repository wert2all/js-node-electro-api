import DI from '../lib/di/DI';
import ServerConfig from '../server/ServerConfig';
import ConnectionInterface from '../lib/db-connection/ConnectionInterface';
import SQLiteConnection from '../lib/db-connection/adapter/SQLiteConnection';
import KeyValueStorageInterface from '../storage/keyvalue/KeyValueStorageInterface';
import ConfigStorage from '../storage/keyvalue/ConfigStorage';
import FileStorage from '../storage/FileStorage';
import FileStorageConfig from '../storage/file/FileStorageConfig';
import path from 'path';
import StorageConfiguration from '../storage/configuration/StorageConfiguration';
import SecretStorage from '../storage/keyvalue/SecretStorage';
import StorageProvider from '../storage/Provider';
import DispatchInterface from '../lib/dispatcher/DispatchInterface';
import EventFileUpload from '../modules/upload/dispatch/event/EventFileUpload';
import FileUploadedObserver from '../modules/upload/dispatch/observers/FileUploadedObserver';
import TelegramApi from '../lib/telegram/TelegramApi';
import Dispatcher from '../lib/dispatcher/Dispatcher';
import RendererInterface from '../lib/renderer/RendererInterface';
import PugAdapter from '../lib/renderer/adapter/PugAdapter';
import ImageUrl from '../data/images/ImageUrl';

export default class DIFactory {
    /**
     *
     * @param {ServerConfig} serverConfig
     * @return DI
     */
    static create(serverConfig) {
        const di = DI.getInstance();
        di.register(ServerConfig, serverConfig);
        di.register(ConnectionInterface, new SQLiteConnection());
        di.register(KeyValueStorageInterface, new ConfigStorage(
            serverConfig.getApplicationDirectory())
        );
        di.register(FileStorage, new FileStorage(
            new FileStorageConfig(
                path.normalize(serverConfig.getApplicationDirectory() + 'data/files/')
            )
        ));
        di.register(StorageConfiguration,
            new StorageConfiguration(
                new SecretStorage(serverConfig.getApplicationDirectory() + 'secret.json'),
                di.get(KeyValueStorageInterface)
            ));
        di.register(
            StorageProvider,
            new StorageProvider(
                di.get(StorageConfiguration),
                di.get(FileStorage)
            ));
        di.register(DispatchInterface, (() => {
            const observers = {};
            observers[EventFileUpload.EVENT_NAME] = [
                new FileUploadedObserver(
                    new TelegramApi(
                        di.get(StorageProvider)
                            .getConfiguration()
                            .getSecretStorage()
                            .fetch('telegram.bot.token'),
                        di.get(StorageProvider)
                            .getConfiguration()
                            .getSecretStorage()
                            .fetch('telegram.bot.chat'),
                    )
                )
            ];
            return new Dispatcher(observers);
        })());

        di.register(RendererInterface, new PugAdapter(
            serverConfig.getWebserverDirectory()
            + di.get(KeyValueStorageInterface).fetch('render.pug.template.directory')
            + di.get(KeyValueStorageInterface).fetch('render.pug.template.name')
        ));

        di.register(
            ImageUrl,
            new ImageUrl(
                di.get(StorageProvider).getConfiguration().getConfig(),
                di.get(StorageProvider).getFileStorage().getConfig()
            )
        );
        return di;
    }
}
