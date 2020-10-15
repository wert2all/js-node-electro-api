import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class ImageResultInterface
 */
export default class ImageResultInterface {
    /**
     * @abstract
     * @return {boolean}
     */
    getStatus() {
        throw new ImplementationError(this, "getStatus");
    }

    /**
     * @abstract
     * @return {Object<string, string>}
     */
    getResultValues() {
        throw new ImplementationError(this, "getResultValues");
    }

    /**
     * @abstract
     * @param {Error} e
     */
    setError(e) {
        throw new ImplementationError(this, "setError");
    }
}
