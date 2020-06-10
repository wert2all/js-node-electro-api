import DI from '../lib/di/DI';
import ConnectionInterface from '../lib/db-connection/ConnectionInterface';
import SQLiteConnection from '../lib/db-connection/adapter/SQLiteConnection';
import KeyValueStorageInterface from '../storage/keyvalue/KeyValueStorageInterface';
import ConfigStorage from '../storage/keyvalue/ConfigStorage';
import FileStorage from '../storage/FileStorage';
import FileStorageConfig from '../storage/file/FileStorageConfig';
import path from 'path';
import DispatchInterface from '../lib/dispatcher/DispatchInterface';
import Dispatcher from '../lib/dispatcher/Dispatcher';
import EventFileUpload from '../modules/upload/dispatch/event/EventFileUpload';
import FileUploadedObserver
    from '../modules/upload/dispatch/observers/FileUploadedObserver';
import TelegramApi from '../lib/telegram/TelegramApi';
import StorageProvider from '../storage/Provider';
import Configuration from '../storage/configuration/Configuration';
import SecretStorage from '../storage/keyvalue/SecretStorage';
import RendererInterface from '../lib/renderer/RendererInterface';
import PugAdapter from '../lib/renderer/adapter/PugAdapter';
import ServerConfig from '../server/ServerConfig';

/**
 *
 * @param {ServerConfig} serverConfig
 */
export function diInit(serverConfig) {
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
    di.register(StorageProvider, new StorageProvider(
        new Configuration(
            new SecretStorage(serverConfig.getApplicationDirectory() + 'secret.json'),
            di.get(KeyValueStorageInterface)
        ),
        di.get(FileStorage),
        di.get(ConnectionInterface)
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
}
