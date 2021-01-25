import AmqpConsumeProcessorInterface from "../../AmqpConsumeProcessorInterface";

/**
 * @class ImageResizeProcessor
 * @extends AmqpConsumeProcessorInterface
 * @type AmqpConsumeProcessorInterface
 */
export default class ImageResizeProcessor extends AmqpConsumeProcessorInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     */
    constructor(amqp) {
        super();
        /**
         *
         * @type {AmqpInterface}
         * @private
         */
        this._amqp = amqp;
    }

    /**
     * @return {Promise}
     * @param channel
     * @param {null|AmqpMessageInterface} message
     * @param msgObj
     */
    process(channel, message, msgObj) {
        return new Promise((resolve, reject) => {
            channel.ack(msgObj);
            resolve();
        });
    }
}
