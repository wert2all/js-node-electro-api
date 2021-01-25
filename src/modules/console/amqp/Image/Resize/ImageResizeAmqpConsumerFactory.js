import AmqpConsumerFactoryInterface from "../../../../../lib/amqp/consumer/AmqpConsumerFactoryInterface";
import ImageResizeAmqpConsumer from "./ImageResizeAmqpConsumer";

/**
 * @class ImageResizeAmqpConsumerFactory
 * @extends AmqpConsumerFactoryInterface
 * @type AmqpConsumerFactoryInterface
 */
export default class ImageResizeAmqpConsumerFactory extends AmqpConsumerFactoryInterface {
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
     * @param {string} queueName
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @return {AmqpConsumerInterface}
     */
    create(queueName, messageFactory) {
        return new ImageResizeAmqpConsumer(queueName, this._amqp, messageFactory);
    }
}
