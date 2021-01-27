import AmqpSenderInterface from "../../../lib/amqp/sender/AmqpSenderInterface";

/**
 * @class DefaultAmqpProducer
 * @extends AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class DefaultAmqpProducer extends AmqpSenderInterface {
    /**
     *
     * @param {AmqpInterface} amqp
     * @param  {string} queueName
     */
    constructor(amqp, queueName) {
        super();
        /**
         *
         * @type {AmqpInterface}
         * @private
         */
        this._amqp = amqp;
        /**
         *
         * @type {string}
         * @private
         */
        this._queueName = queueName;
    }

    /**
     *
     * @return {string}
     */
    getQueueName() {
        return this._queueName;
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
