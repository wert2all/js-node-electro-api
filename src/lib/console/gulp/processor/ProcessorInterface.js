import ImplementationError from "../../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ProcessorInterface
 */
export default class ProcessorInterface {
    /**
     * @abstract
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResultInterface>} result
     */
    async processImage(entity, result) {
        throw new ImplementationError(this, "processImage");
    }
}
