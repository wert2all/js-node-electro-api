import IMlProcessor from "./IMlProcessor";
import ImageResult from "../gulp/image/ImageResult";

/**
 * @class MLFakeProcessor
 * @extends IMlProcessor
 * @type IMlProcessor
 */
export default class MLFakeProcessor extends IMlProcessor {
    /**
     *
     * @param {IMLModel|null} prevModel
     */
    constructor(prevModel) {
        super();
        /**
         *
         * @type {IMLModel|null}
         * @private
         */
        this._prevModel = prevModel;
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     */
    async processImage(entity, result) {
        return Promise.resolve();
    }
}
