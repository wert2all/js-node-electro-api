import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @class AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class AmqpSenderInterface {
    /**
     * @abstract
     * @param {AmqpMessageInterface} message
     * @return {Promise<boolean>}
     */
    send(message) {
        throw new ImplementationError(this, "send");
    }

    /**
     * @abstract
     * @return {string}
     */
    getQueueName() {
        throw new ImplementationError(this, "getQueueName");
    }
}
