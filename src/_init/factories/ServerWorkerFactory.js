import ServerWorker from "../../server/ServerWorker";

export default class ServerWorkerFactory {
    /**
     *
     * @param {DI} di
     * @param {ApplicationFactory} applicationFactory
     */
    constructor(di, applicationFactory) {
        /**
         *
         * @type {DI}
         * @private
         */
        this._di = di;
        /**
         *
         * @type {ApplicationFactory}
         * @private
         */
        this._applicationFactory = applicationFactory;
    }

    create() {
        return new ServerWorker(this._applicationFactory.create(this._di));
    }
}
