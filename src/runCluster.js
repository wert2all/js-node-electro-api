import os from 'os';
import sqlite3 from 'sqlite3';

import ServerCluster from './server/ServerCluster';
import ConnectionInterface from './lib/db-connection/ConnectionInterface';
import ServerConfigFactory from './_init/ServerConfigFactory';
import DIFactory from './_init/DIFactory';
import ExpressFactory from './_init/ExpressFactory';
import ServerWorkerFactory from './_init/ServerWorkerFactory';
import ApplicationFactory from './_init/ApplicationFactory';

const connectDB = path => new Promise((resolve, reject) => {
    const db = new sqlite3.cached.Database(path, err => {
        if (err) {
            reject(err);
        }
        resolve(db);
    });
});

const serverConfig = ServerConfigFactory.create();
const di = DIFactory.create(serverConfig);
const expressInstance = ExpressFactory.create(serverConfig);

connectDB(serverConfig.getApplicationDirectory() + 'secret.sqlite')
    .then(connection => {
        di.get(ConnectionInterface)
            .setServer(connection);
        return di;
    })
    .then(() => {
        new ServerCluster(
            new ServerWorkerFactory(di, new ApplicationFactory(expressInstance))
                .create(),
            os.cpus().length
        )
            .run();
    })
    .catch(err => console.log(err));
