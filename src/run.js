import os from 'os';
import sqlite3 from 'sqlite3';
import path from 'path';

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
import diInit from './_init/DIInit';
import expressInit from './_init/ExpressInit';
import DispatchInterface from './lib/dispatcher/DispatchInterface';
import UIRequest from './modules/ui/UIRequest';
import ServerConfig from './server/ServerConfig';
import ImagesGetRequest from './modules/images/ImagesGetRequest';

const serverConfig = new ServerConfig(
    path.normalize(__dirname + path.sep + '..' + path.sep),
    path.normalize(__dirname + path.sep + '..' + path.sep + '..' + path.sep)
);
const connectDB = path => new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path, err => {
        if (err) {
            reject(err);
        }
        resolve(db);
    });
});
connectDB(serverConfig.getApplicationDirectory() + 'secret.sqlite')
    .then(connection => {
        const di = diInit(serverConfig);
        const expressInstance = expressInit(serverConfig);

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
                            new RouteDefinition('/images/get/',
                                'get',
                                new ImagesGetRequest()
                            ),
                            new RouteDefinition('/ui/',
                                'get',
                                new UIRequest()
                            ),
                        ]),
                    di.get(StorageProvider),
                    di.get(DispatchInterface),
                    new ResponseFactory()
                )
            ),
            os.cpus().length
        )
            .run(connection);
    })
    .catch(err => console.log(err));
