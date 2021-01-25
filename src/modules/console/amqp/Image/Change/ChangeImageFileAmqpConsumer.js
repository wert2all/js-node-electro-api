import AmqpConsumerInterface from "../../../../../lib/amqp/consumer/AmqpConsumerInterface";
import ImageResizeAmqpProducer from "../Resize/ImageResizeAmqpProducer";

/**
 * @class ChangeImageFileAmqpConsumer
 * @extends AmqpConsumerInterface
 * @type AmqpConsumerInterface
 */
export default class ChangeImageFileAmqpConsumer extends AmqpConsumerInterface {
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
            /**
             *
             * @type {AmqpMessageInterface|null}
             */
            const message = this._messageFactory.fromMessage(msg);
            if (message != null) {
                const producer = new ImageResizeAmqpProducer(this._amqp);
                producer
                    .send(message)
                    .then()
                    .catch((err) => {
                        console.log(err);
                        channel.reject(msg, false);
                    });
                console.log(this._queueName + ": done");
                channel.ack(msg);
            } else {
                console.log("rejecting message");
                channel.reject(msg, false);
            }
        });
    }
}
