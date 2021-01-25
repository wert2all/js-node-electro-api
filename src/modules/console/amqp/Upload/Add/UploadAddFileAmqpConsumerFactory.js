import UploadAddFileAmqpConsumer from "./UploadAddFileAmqpConsumer";
import AmqpConsumerFactoryInterface from "../../../../../lib/amqp/consumer/AmqpConsumerFactoryInterface";

/**
 * @class UploadAddFileAmqpConsumerFactory
 * @extends AmqpConsumerFactoryInterface
 * @type AmqpConsumerFactoryInterface
 */
export default class UploadAddFileAmqpConsumerFactory extends AmqpConsumerFactoryInterface {
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
        return new UploadAddFileAmqpConsumer(queueName, this._amqp, messageFactory);
    }
}
