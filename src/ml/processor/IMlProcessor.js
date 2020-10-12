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
     * @return {ImageResult|null}
     */
    processImage(entity) {
        throw new ImplementationError(this, "processImage");
    }
}
