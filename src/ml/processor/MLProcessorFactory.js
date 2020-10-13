import MLFakeProcessor from "./MLFakeProcessor";

/**
 * @class MLProcessorFactory
 */
export default class MLProcessorFactory {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        /**
         *
         * @type {ConnectionInterface}
         * @private
         */
        this._connection = connection;
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {IMlProcessor|null}
     */
    create(entity) {
        return new MLFakeProcessor(this._connection, null);
    }
}
