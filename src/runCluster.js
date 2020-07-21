import os from 'os';
import ServerCluster from './server/ServerCluster';
import ServerWorkerFactory from './_init/factories/ServerWorkerFactory';
import ApplicationFactory from './_init/factories/ApplicationFactory';
import Runner from './_init/Runner';

new Runner((di) => {
    new ServerCluster(
        new ServerWorkerFactory(di, new ApplicationFactory()).create(),
        os.cpus().length
    )
        .run();
})
    .run();
