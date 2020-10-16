import ImplementationError from "../../../implementation-error/ImplementationErrorInterface";

/**
 * @interface
 * @abstract
 * @class ImageFilterEntityFactoryInterface
 */
export default class ImageFilterEntityFactoryInterface {
    /**
     * @abstract
     * @return UserFilesEntity
     */
    factory() {
        throw ImplementationError(this, "factory");
    }
}
