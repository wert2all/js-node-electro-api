import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpConsumerInterface
 */
export default class AmqpConsumerInterface {
    /**
     * @abstract
     * @return {Promise<void>}
     */
    consume() {
        throw new ImplementationError(this, "consume");
    }
}
