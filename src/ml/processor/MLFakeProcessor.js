import IMlProcessor from "./IMlProcessor";
import ImageResult from "../gulp/image/ImageResult";
import MLModelLoggingRepository from "../../db/repository/ml/MLModelLoggingRepository";
import DI from "../../lib/di/DI";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import MLLoggingEntity from "../../data/entity/ml/MLLoggingEntity";

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
        return this._processModel(entity, result);
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
        const loggingEntity = this._createLoggingEntity(entity);
        await this._em.save(this._loggingRepository.getDefinition(), loggingEntity);
        return Promise.resolve();
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {MLLoggingEntity}
     * @private
     */
    _createLoggingEntity(entity) {
        const returnEntity = new MLLoggingEntity();
        returnEntity
            .setModelAlias(this._prevModel.getAlias())
            .setEntityId(entity.getExtensionEntity().getEntityId())
            .setStatus(true)
            .setMessage("Learning model");
        return returnEntity;
    }

    async _processModel(entity, result) {
        await this._currentModel.process(entity, result);
        await this._loggingProcess(entity, result);
        return Promise.resolve(result);
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     * @return {Promise<void>} result
     */
    async _loggingProcess(entity, result) {
        const logEntity = this._createLoggingEntity(entity).setStatus(result.getStatus());
        await this._em.save(this._loggingRepository.getDefinition(), logEntity);
        return Promise.resolve();
    }
}
