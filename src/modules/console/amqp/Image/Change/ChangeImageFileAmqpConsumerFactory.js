import AmqpConsumerFactoryInterface from "../../../../../lib/amqp/consumer/AmqpConsumerFactoryInterface";
import ChangeImageFileAmqpConsumer from "./ChangeImageFileAmqpConsumer";

/**
 * @class ChangeImageFileAmqpConsumerFactory
 * @extends AmqpConsumerFactoryInterface
 * @type AmqpConsumerFactoryInterface
 */
export default class ChangeImageFileAmqpConsumerFactory extends AmqpConsumerFactoryInterface {
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
        return new ChangeImageFileAmqpConsumer(queueName, this._amqp, messageFactory);
    }
}
