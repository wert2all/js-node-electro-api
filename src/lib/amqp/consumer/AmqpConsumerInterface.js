import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpConsumerInterface
 */
export default class AmqpConsumerInterface {
    /**
     * @abstract
     * @return {Promise<ConsumeHandlerHolder>}
     */
    consume() {
        throw new ImplementationError(this, "consume");
    }
}
