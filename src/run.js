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
import SecretStorage from './storage/Secret';
import FileStorage from './storage/FileStorage';
import FileStorageConfig from './storage/file/FileStorageConfig';
import SQLiteConnection from './lib/db-connection/adapter/SQLiteConnection';
import UploadGetCountRequest from './modules/upload/UploadGetCountRequest';

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
                        ]),
                    new StorageProvider(
                        new SecretStorage(rootPath + 'secret.json'),
                        new FileStorage(
                            new FileStorageConfig(
                                path.normalize(rootPath + 'data/files/')
                            )
                        ),
                        new SQLiteConnection()
                    )
                )
            ),
            os.cpus().length
        )
            .run(connection);
    })
    .catch(err => console.log(err));
