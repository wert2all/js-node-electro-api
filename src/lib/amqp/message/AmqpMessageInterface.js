import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpMessageInterface
 */
export default class AmqpMessageInterface {
    /**
     * @abstract
     * @returns {string}
     */
    toString() {
        throw new ImplementationError(this, "toString");
    }
}
