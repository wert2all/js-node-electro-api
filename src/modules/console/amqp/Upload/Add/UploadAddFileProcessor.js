import AmqpConsumeProcessorInterface from "../../AmqpConsumeProcessorInterface";

/**
 * @class UploadAddFileProcessor
 * @extends AmqpConsumeProcessorInterface
 * @type AmqpConsumeProcessorInterface
 */
export default class UploadAddFileProcessor extends AmqpConsumeProcessorInterface {
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
            if (message !== null) {
                channel.ack(msgObj);
                resolve();
            } else {
                channel.reject(msgObj, false);
                reject("Null message");
            }
        });
    }
}
