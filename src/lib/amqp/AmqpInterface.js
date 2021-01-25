import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpInterface
 */
export default class AmqpInterface {
    /**
     * @abstract
     * @param {string} queueName
     * @param {AmqpMessageInterface} message
     * @return {Promise<boolean>}
     */
    sendMessage(queueName, message) {
        throw new ImplementationError(this, "sendMessage");
    }

    /**
     * @abstract
     * @param {string} queueName
     * @return {Promise<ConsumeHandlerHolder>}
     */
    consume(queueName) {
        throw new ImplementationError(this, "consume");
    }
}
