import AmqpSenderInterface from "../../../lib/amqp/sender/AmqpSenderInterface";

/**
 * @class ChangeImageAmqpSender
 * @extends AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class ChangeImageAmqpSender extends AmqpSenderInterface {
    static QUEUE = "amqp.change.file";

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
        return ChangeImageAmqpSender.QUEUE;
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
