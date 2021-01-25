import AmqpConsumerInterface from "../../../../../lib/amqp/consumer/AmqpConsumerInterface";

/**
 * @class ImageResizeAmqpConsumer
 * @extends AmqpConsumerInterface
 * @type AmqpConsumerInterface
 */
export default class ImageResizeAmqpConsumer extends AmqpConsumerInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     * @param {string} queueName
     * @param {AmqpMessageFactoryInterface} messageFactory
     */
    constructor(queueName, amqp, messageFactory) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._queueName = queueName;
        /**
         *
         * @type {AmqpInterface}
         * @private
         */
        this._amqp = amqp;
        /**
         *
         * @type {AmqpMessageFactoryInterface}
         * @private
         */
        this._messageFactory = messageFactory;
    }

    /**
     *
     * @return {Promise<void>}
     */
    consume() {
        return this._amqp.consume(this._queueName, (channel, msg) => {
            console.log("image resizing");
            channel.ack(msg);
        });
    }
}
