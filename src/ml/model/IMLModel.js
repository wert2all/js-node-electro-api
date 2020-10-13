/**
 * @interface
 * @abstract
 * @class IMLModel
 */
export default class IMLModel {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @return Promise<boolean>
     */
    async isLearned(entity) {}

    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @return {Promise<void>}
     */
    async training(entity) {}

    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     * @return {Promise<ImageResult>}
     */
    async process(entity, result) {}
}
