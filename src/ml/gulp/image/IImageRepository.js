import ImplementationError from "../../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class IImageRepository
 */
export default class IImageRepository {
    /**
     * @abstract
     * @return {IImageManager[]}
     */
    async getImages() {
        throw new ImplementationError(this, "getImages");
    }
}
