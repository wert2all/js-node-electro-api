import AmqpConsumerInterface from "../../../lib/amqp/consumer/AmqpConsumerInterface";

/**
 * @class UploadAddFileAmqpConsumer
 * @type AmqpConsumerInterface
 * @extends AmqpConsumerInterface
 */
export default class UploadAddFileAmqpConsumer extends AmqpConsumerInterface {
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

    consume() {
        return this._amqp.consume(this._queueName, (channel, msg) => {
            /**
             *
             * @type {AmqpMessageInterface|null}
             */
            const message = this._messageFactory.fromMessage(msg);
            if (message != null) {
                console.log(message);
            }
            channel.ack(msg);
        });
    }
}
