import AmqpConsumerInterface from "./AmqpConsumerInterface";
import AmqpConsumeHandler from "./handler/AmqpConsumeHandler";

/**
 * @class AmqpConsumer
 * @extends AmqpConsumerInterface
 * @type AmqpConsumerInterface
 */
export default class AmqpConsumer extends AmqpConsumerInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     * @param {string} queueName
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @param {AmqpConsumeProcessorInterface} processor
     */
    constructor(queueName, amqp, messageFactory, processor) {
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
        /**
         *
         * @type {AmqpConsumeProcessorInterface}
         * @private
         */
        this._processor = processor;
    }

    /**
     *
     * @return {Promise<void>}
     */
    consume() {
        return this._amqp.consume(this._queueName, new AmqpConsumeHandler(this._processor, this._messageFactory));
    }
}
