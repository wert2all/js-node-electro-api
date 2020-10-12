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
     * @return {Promise<void>}
     */
    async startProcess() {
        throw new ImplementationError(this, "startProcess");
    }

    /**
     * @abstract
     * @return {Promise<void>}
     */
    async stopProcess() {
        throw new ImplementationError(this, "stopProcess");
    }

    /**
     * @abstract
     * @return {UserFilesEntity}
     */
    getData() {
        throw new ImplementationError(this, "getData");
    }

    /**
     * @abstract
     * @param {ImageResult|null} result
     * @return {IImageManager}
     */
    setResult(result) {
        throw new ImplementationError(this, "setResult");
    }
}
