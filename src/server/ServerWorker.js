import ServerWorkerInterface from './ServerWorkerInterface';
import http from 'http';

/**
 * @class ServerWorker
 * @extends ServerWorkerInterface
 * @type ServerWorkerInterface
 */
export default class ServerWorker extends ServerWorkerInterface {

    /**
     *
     * @param {ServerApplicationInterface} application
     */
    constructor(application) {
        super();
        /**
         *
         * @type {ServerApplicationInterface}
         * @private
         */
        this._application = application;
    }

    run() {
        const pid = process.pid;
        this._application
            .init()
            .run();

        const server = http.createServer(this._application.getRequestListener())
            .listen(3000, () => console.log(`Worker started. Pid: ${pid}`));

        process.on('SIGINT', () => {
            console.log('Signal is SIGINT');
            server.close(() => process.exit(0));
        });

        process.on('SIGTERM', () => {
            console.log('Signal is SIGTERM');
            server.close(() => process.exit(0));
        });

        process.on('SIGUSR2', () => {
            console.log('Signal is SIGUSR2');
            server.close(() => process.exit(1));
        });
    }
}
