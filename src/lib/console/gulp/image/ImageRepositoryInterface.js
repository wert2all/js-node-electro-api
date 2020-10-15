import ImplementationError from "../../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ImageRepositoryInterface
 */
export default class ImageRepositoryInterface {
    /**
     * @abstract
     * @return {ImageManagerInterface[]}
     */
    async getImages() {
        throw new ImplementationError(this, "getImages");
    }
}
