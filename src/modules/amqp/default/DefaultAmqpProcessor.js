import AmqpConsumeProcessorInterface from "../../console/amqp/AmqpConsumeProcessorInterface";

/**
 * @class DefaultAmqpProcessor
 * @extends AmqpConsumeProcessorInterface
 * @type AmqpConsumeProcessorInterface
 */
export default class DefaultAmqpProcessor extends AmqpConsumeProcessorInterface {
    /**
     * @return {Promise}
     * @param channel
     * @param {null|AmqpMessageInterface} message
     * @param msgObj
     */
    process(channel, message, msgObj) {
        channel.ack(msgObj);
        return Promise.resolve();
    }
}
