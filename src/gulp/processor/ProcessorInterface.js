import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ProcessorInterface
 */
export default class ProcessorInterface {
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
