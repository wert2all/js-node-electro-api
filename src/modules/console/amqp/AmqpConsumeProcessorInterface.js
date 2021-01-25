import ImplementationError from "../../../lib/implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpConsumeProcessorInterface
 */
export default class AmqpConsumeProcessorInterface {
    /**
     * @abstract
     * @return {Promise}
     * @param channel
     * @param {null|AmqpMessageInterface} message
     * @param msgObg
     */
    process(channel, message, msgObg) {
        throw new ImplementationError(this, "process");
    }
}
