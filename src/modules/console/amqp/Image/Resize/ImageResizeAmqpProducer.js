import AmqpSenderInterface from "../../../../../lib/amqp/sender/AmqpSenderInterface";

/**
 * @class ImageResizeAmqpProducer
 * @extends AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class ImageResizeAmqpProducer extends AmqpSenderInterface {
    static QUEUE = "amqp.image.resize";

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
     *
     * @return {string}
     */
    getQueueName() {
        return ImageResizeAmqpProducer.QUEUE;
    }

    /**
     *
     * @param {AmqpMessageInterface} message
     * @return {Promise<boolean>}
     */
    send(message) {
        return this._amqp.sendMessage(this.getQueueName(), message);
    }
}
