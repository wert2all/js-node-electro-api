/**
 * @interface
 * @abstract
 * @class IImageManager
 */
import ImplementationError from "../../../lib/implementation-error/ImplementationError";

export default class IImageManager {
    /**
     * @abstract
     * @return boolean
     */
    canProcess() {
        throw new ImplementationError(this, "canProcess");
    }

    /**
     * @abstract
     * @return IImageManager
     */
    startProcess() {
        throw new ImplementationError(this, "startProcess");
    }

    /**
     * @abstract
     * @return IImageManager
     */
    stopProcess() {
        throw new ImplementationError(this, "stopProcess");
    }

    /**
     * @abstract
     * @return {UserFilesEntity}
     */
    getData() {
        throw new ImplementationError(this, "getData");
    }
}
