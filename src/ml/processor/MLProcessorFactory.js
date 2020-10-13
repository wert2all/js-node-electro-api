import MLProcessor from "./MLProcessor";
import MLFakeModel from "../model/MLFakeModel";

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
     * @return {IMLProcessor|null}
     */
    create(entity) {
        return new MLProcessor(this._connection, new MLFakeModel());
    }
}
