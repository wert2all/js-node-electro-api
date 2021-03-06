import ProcessorInterface from "../../../../lib/console/gulp/processor/ProcessorInterface";
import MLModelLoggingRepository from "../../../../db/repository/ml/MLModelLoggingRepository";
import DI from "../../../../lib/di/DI";
import EntityManager from "../../../../lib/db-entity-manager/EntityManager";
import MLLoggingEntity from "../../../../data/entity/ml/MLLoggingEntity";

/**
 * @class MLProcessor
 * @extends ProcessorInterface
 * @type ProcessorInterface
 */
export default class MLProcessor extends ProcessorInterface {
    /**
     *
     * @param {ReadConnectionInterface} readConnection
     * @param {IMLModel} currentModel
     * @param {IMLModel|null} prevModel
     */
    constructor(readConnection, currentModel, prevModel = null) {
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
        this._loggingRepository.setConnection(readConnection);
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
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResult>} result
     */
    async processImage(entity, result) {
        await this._loggingStart(entity);
        await this._learnPrevModel(entity);
        await this._loggingProcess(entity, result, true);
        await this._processModel(entity, result);
        await this._loggingProcess(entity, result, false);
        return Promise.resolve(result);
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
                await this._loggingLearning(entity, true);
                await this._prevModel.training(entity);
                await this._loggingLearning(entity, false);
            }
        }
        return Promise.resolve();
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {IMLModel} model
     * @return {MLLoggingEntity}
     * @private
     */
    _createLoggingEntity(entity, model) {
        const returnEntity = new MLLoggingEntity();
        returnEntity
            .setModelAlias(model.getAlias())
            .setEntityId(entity.getExtensionEntity().getEntityId())
            .setStatus(true);
        return returnEntity;
    }

    async _processModel(entity, result) {
        await this._currentModel.process(entity, result);
        return Promise.resolve(result);
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @param {boolean} isStart
     * @return {Promise<void>} result
     */
    async _loggingProcess(entity, result, isStart = true) {
        const logEntity = this._createLoggingEntity(entity, this._currentModel);
        logEntity.setStatus(result.getStatus());
        logEntity.setMessage("Process model: " + (isStart ? "start" : "end"));
        return this._logging(logEntity);
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {Promise<void>} result
     */
    async _loggingStart(entity) {
        const logEntity = this._createLoggingEntity(entity, this._currentModel);
        logEntity.setStatus(true);
        logEntity.setMessage("Start");
        return this._logging(logEntity);
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {boolean} isStart
     * @return {Promise<void>}
     * @private
     */
    async _loggingLearning(entity, isStart = true) {
        const logEntity = this._createLoggingEntity(entity, this._prevModel).setMessage(
            "Learning model: " + (isStart ? "start" : "end")
        );
        return this._logging(logEntity);
    }

    /**
     *
     * @param {MLLoggingEntity} entity
     * @return {Promise<void>}
     * @private
     */
    async _logging(entity) {
        await this._em.save(this._loggingRepository.getDefinition(), entity);
        return Promise.resolve();
    }
}
