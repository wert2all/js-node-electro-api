import MLProcessor from "./MLProcessor";
import MLFakeModel from "../model/MLFakeModel";
import ProcessorFactoryInterface from "../../../../lib/console/gulp/processor/ProcessorFactoryInterface";

/**
 * @class MLProcessorFactory
 */
export default class MLProcessorFactory extends ProcessorFactoryInterface {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        super();
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
     * @return {ProcessorInterface|null}
     */
    create(entity) {
        return new MLProcessor(this._connection, new MLFakeModel());
    }
}
