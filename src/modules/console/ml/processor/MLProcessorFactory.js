import MLProcessor from "./MLProcessor";
import MLFakeModel from "../model/MLFakeModel";
import ProcessorFactoryInterface from "../../../../lib/console/gulp/processor/ProcessorFactoryInterface";

/**
 * @class MLProcessorFactory
 */
export default class MLProcessorFactory extends ProcessorFactoryInterface {
    /**
     *
     * @param {ReadConnectionInterface} readConnection
     */
    constructor(readConnection) {
        super();
        /**
         *
         * @type {ReadConnectionInterface}
         * @private
         */
        this._readConnection = readConnection;
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {ProcessorInterface|null}
     */
    create(entity) {
        return new MLProcessor(this._readConnection, new MLFakeModel());
    }
}
