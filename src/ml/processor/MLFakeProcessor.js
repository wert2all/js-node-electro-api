import IMlProcessor from "./IMlProcessor";
import ImageResult from "../gulp/image/ImageResult";
import MLModelLoggingRepository from "../../db/repository/ml/MLModelLoggingRepository";
import DI from "../../lib/di/DI";
import EntityManager from "../../lib/db-entity-manager/EntityManager";

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
        /**
         *
         * @type {MLModelLoggingRepository}
         * @private
         */
        this._loggingRepository = new MLModelLoggingRepository();
        this._loggingRepository.setConnection(connection);
        /**
         *
         * @type {EntityManager}
         * @private
         */
        this._em = DI.getInstance().get(EntityManager);
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
                await this._loggingLearning(entity);
                await this._prevModel.training(entity);
            }
        }
        return Promise.resolve();
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {Promise<void>}
     * @private
     */
    async _loggingLearning(entity) {
        return Promise.resolve();
    }
}
