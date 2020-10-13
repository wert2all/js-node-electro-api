import IMLModel from "./IMLModel";

/**
 * @class MLFakeModel
 * @extends IMLModel
 * @type IMLModel
 */
export default class MLFakeModel extends IMLModel {
    /**
     *
     * @return {string}
     */
    getAlias() {
        return "ml_fake_model";
    }

    /**
     * @param {UserFilesEntity} entity
     * @return Promise<boolean>
     */
    async isLearned(entity) {
        return Promise.resolve(false);
    }

    /**
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     * @return {Promise<ImageResult>}
     */
    async process(entity, result) {
        return Promise.resolve(result);
    }

    /**
     * @param {UserFilesEntity} entity
     * @return {Promise<void>}
     */
    async training(entity) {
        return Promise.resolve();
    }
}
