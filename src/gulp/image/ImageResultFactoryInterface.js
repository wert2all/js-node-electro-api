import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ImageResultFactoryInterface
 */
export default class ImageResultFactoryInterface {
    /**
     * @abstract
     * @return ImageResultInterface
     */
    create() {
        throw new ImplementationError(this, "create");
    }
}
