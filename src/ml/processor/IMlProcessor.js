import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class IMlProcessor
 */
export default class IMlProcessor {
    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ImageResult} result
     */
    async processImage(entity, result) {
        throw new ImplementationError(this, "processImage");
    }
}
