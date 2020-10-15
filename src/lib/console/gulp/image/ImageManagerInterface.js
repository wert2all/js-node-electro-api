import ImplementationError from "../../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ImageManagerInterface
 */
export default class ImageManagerInterface {
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
     * @param {ImageResultInterface|null} result
     * @return {ImageManagerInterface}
     */
    setResult(result) {
        throw new ImplementationError(this, "setResult");
    }
}
