import AmqpConsumeProcessorInterface from "../../AmqpConsumeProcessorInterface";
import ImageResizeAmqpProducer from "../Resize/ImageResizeAmqpProducer";

/**
 * @class ChangeImageProcessor
 * @extends AmqpConsumeProcessorInterface
 * @type AmqpConsumeProcessorInterface
 */
export default class ChangeImageProcessor extends AmqpConsumeProcessorInterface {
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
                const producer = new ImageResizeAmqpProducer(this._amqp);
                producer
                    .send(message)
                    .then()
                    .catch((err) => {
                        console.log(err);
                        channel.reject(msgObj, false);
                        reject(err);
                    });

                channel.ack(msgObj);
                resolve();
            } else {
                channel.reject(msgObj, false);
                reject("Null message");
            }
        });
    }
}
