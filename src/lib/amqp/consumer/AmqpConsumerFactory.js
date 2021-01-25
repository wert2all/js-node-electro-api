import AmqpConsumerFactoryInterface from "./AmqpConsumerFactoryInterface";
import AmqpConsumer from "./AmqpConsumer";

/**
 * @class AmqpConsumerFactory
 * @extends AmqpConsumerFactoryInterface
 * @type AmqpConsumerFactoryInterface
 */
export default class AmqpConsumerFactory extends AmqpConsumerFactoryInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     * @param {AmqpConsumeProcessorInterface} processor
     */
    constructor(amqp, processor) {
        super();
        /**
         *
         * @type {AmqpInterface}
         * @private
         */
        this._amqp = amqp;
        /**
         *
         * @type {AmqpConsumeProcessorInterface}
         * @private
         */
        this._processor = processor;
    }

    /**
     *
     * @param {string} queueName
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @return {AmqpConsumerInterface}
     */
    create(queueName, messageFactory) {
        return new AmqpConsumer(queueName, this._amqp, messageFactory, this._processor);
    }
}
