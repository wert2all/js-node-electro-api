import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class LogEventInterface
 */
export default class LogEventInterface {
    /**
     * @abstract
     * @return {string}
     */
    getTag() {
        throw new ImplementationError(this, "getTag");
    }

    /**
     * @abstract
     * @return Date
     */
    getTime() {
        throw new ImplementationError(this, "getTime");
    }

    /**
     * @abstract
     * @return {string}
     */
    getMessage() {
        throw new ImplementationError(this, "getMessage");
    }
}
