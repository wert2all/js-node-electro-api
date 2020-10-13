import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class IMLProcessor
 */
export default class IMLProcessor {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     * @return {Promise<ImageResult>} result
     */
    async processImage(entity, result) {
        throw new ImplementationError(this, "processImage");
    }
}
