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
import UploadGetCountRequest from './modules/upload/UploadGetCountRequest';
import UserProfileGetRequest from './modules/user/UserProfileGetRequest';
import UserProfileUpdatePostRequest from './modules/user/UserProfileUpdatePostRequest';
import UploadGetFilesRequest from './modules/upload/UploadGetFilesRequest';
import ResponseFactory from './routers/response/ResponseFactory';
import {diInit} from './di/register';
import DI from './lib/di/DI';
import DispatchInterface from './lib/dispatcher/DispatchInterface';
import UIRequest from './modules/ui/UIRequest';

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
        diInit(rootPath);

        const expressInstance = express();
        // static middleware
        expressInstance.use('/images', express.static(rootPath + 'data/files/images/'));
        expressInstance.use('/assets', express.static(rootPath + 'dist/assets/'));

        new ServerCluster(
            new ServerWorker(
                new Application(
                    expressInstance,
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
                            new RouteDefinition('/ui/',
                                'get',
                                new UIRequest()
                            ),
                        ]),
                    DI.getInstance().get(StorageProvider),
                    DI.getInstance().get(DispatchInterface),
                    new ResponseFactory()
                )
            ),
            os.cpus().length
        )
            .run(connection);
    })
    .catch(err => console.log(err));
