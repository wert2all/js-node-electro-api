import cluster from 'cluster';

/**
 * @class ServerCluster
 */
export default class ServerCluster {
    /**
     *
     * @param {ServerWorkerInterface} worker
     * @param {number} instanceCount
     */
    constructor(worker, instanceCount) {
        /**
         *
         * @type {ServerWorkerInterface}
         * @private
         */
        this._worker = worker;
        /**
         *
         * @type {number}
         * @private
         */
        this._instanceCount = instanceCount;
    }

    run() {
        const pid = process.pid;
        if (cluster.isMaster) {
            console.log(`CPUs: ${this._instanceCount}`);
            console.log(`Master started. Pid: ${pid}`);
            for (let i = 0; i < this._instanceCount - 1; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code) => {
                console.log(`Worker died! Pid: ${worker.process.pid}. Code ${code}`);
                if (code === 1) {
                    cluster.fork();
                }
            });
        }

        if (cluster.isWorker) {
            this._worker.run();
        }
    }

}
