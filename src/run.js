import os from 'os';
import sqlite3 from 'sqlite3';
import path from 'path';
import express from 'express';

import ServerCluster from './server/ServerCluster';
import ServerWorker from './server/ServerWorker';
import Application from './Application';
import RoutersProviderFactory from './routers/RoutersProviderFactory';
import RouteDefinition from './routers/RouteDefinition';
import TariffRequest from './modules/tariff/TariffRequest';
import AuthRequest from './modules/auth/AuthRequest';
import UploadPostRequest from './modules/upload/UploadPostRequest';
import StorageProvider from './storage/Provider';
import SecretStorage from './storage/keyvalue/SecretStorage';
import FileStorage from './storage/FileStorage';
import FileStorageConfig from './storage/file/FileStorageConfig';
import SQLiteConnection from './lib/db-connection/adapter/SQLiteConnection';
import UploadGetCountRequest from './modules/upload/UploadGetCountRequest';
import UserProfileGetRequest from './modules/user/UserProfileGetRequest';
import UserProfileUpdatePostRequest from './modules/user/UserProfileUpdatePostRequest';
import Dispatcher from './lib/dispatcher/Dispatcher';
import EventFileUpload from './modules/upload/dispatch/event/EventFileUpload';
import FileUploadedObserver from
        './modules/upload/dispatch/observers/FileUploadedObserver';
import TelegramApi from './lib/telegram/TelegramApi';
import UploadGetFilesRequest from './modules/upload/UploadGetFilesRequest';
import Configuration from './storage/configuration/Configuration';
import ConfigStorage from './storage/keyvalue/ConfigStorage';

const rootPath = path.normalize(__dirname + path.sep + '..' + path.sep + '..' + path.sep);
const connectDB = path => new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path, err => {
        if (err) {
            reject(err);
        }
        resolve(db);
    });
});
connectDB(rootPath + 'secret.sqlite')
    .then(connection => {
        /**
         *
         * @type {StorageProvider}
         */
        const storage = new StorageProvider(
            new Configuration(
                new SecretStorage(rootPath + 'secret.json'),
                new ConfigStorage(rootPath)
            ),
            new FileStorage(
                new FileStorageConfig(
                    path.normalize(rootPath + 'data/files/')
                )
            ),
            new SQLiteConnection()
        );
        const observers = {};
        observers[EventFileUpload.EVENT_NAME] = [
            new FileUploadedObserver(
                new TelegramApi(
                    storage.getSecretStorage().fetch('telegram.bot.token'),
                    storage.getSecretStorage().fetch('telegram.bot.chat'),
                )
            )
        ];
        new ServerCluster(
            new ServerWorker(
                new Application(
                    express(),
                    new RoutersProviderFactory(
                        [
                            new RouteDefinition('/', 'get', new TariffRequest()),
                            new RouteDefinition('/auth/', 'post', new AuthRequest()),
                            new RouteDefinition(
                                '/upload/count/',
                                'get',
                                new UploadGetCountRequest()
                            ),
                            new RouteDefinition('/upload/',
                                'post',
                                new UploadPostRequest()
                            ),
                            new RouteDefinition('/user/profile/',
                                'get',
                                new UserProfileGetRequest()
                            ),
                            new RouteDefinition('/user/profile/update/',
                                'post',
                                new UserProfileUpdatePostRequest()
                            ),
                            new RouteDefinition('/upload/files/',
                                'get',
                                new UploadGetFilesRequest()
                            ),
                        ]),
                    storage,
                    new Dispatcher(observers)
                )
            ),
            os.cpus().length
        )
            .run(connection);
    })
    .catch(err => console.log(err));
