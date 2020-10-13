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
     * @param {ConnectionInterface} connection
     * @param {IMLModel} currentModel
     * @param {IMLModel|null} prevModel
     */
    constructor(connection, currentModel, prevModel = null) {
        super();
        /**
         *
         * @type {IMLModel}
         * @private
         */
        this._currentModel = currentModel;
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
     * @return {Promise<ImageResult>} result
     */
    async processImage(entity, result) {
        await this._learnPrevModel(entity);
        return this._currentModel.process(entity, result);
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {Promise<void>}
     * @private
     */
    async _learnPrevModel(entity) {
        if (this._prevModel) {
            if ((await this._prevModel.isLearned(entity)) !== true) {
                await this._prevModel.training(entity);
            }
        }
        return Promise.resolve();
    }
}
