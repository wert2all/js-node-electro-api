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
     * @param msgObj
     */
    process(channel, message, msgObj) {
        throw new ImplementationError(this, "process");
    }
}
