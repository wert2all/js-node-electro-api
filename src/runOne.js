import ServerWorkerFactory from './_init/factories/ServerWorkerFactory';
import ApplicationFactory from './_init/factories/ApplicationFactory';
import Runner from './_init/Runner';

new Runner((di) => {
    new ServerWorkerFactory(
        di, new ApplicationFactory()
    )
        .create()
        .run();
})
    .run();
