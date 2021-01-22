import AmqpSenderInterface from "../../../lib/amqp/AmqpSenderInterface";

/**
 * @class UploadAmqpSender
 * @extends  AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class UploadAmqpSender extends AmqpSenderInterface {
    static QUEUE = "amqp.upload.file";

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
     * @param {AmqpMessageInterface} message
     * @return {Promise<boolean>}
     */
    send(message) {
        return this._amqp.sendMessage(this.getQueueName(), message);
    }

    /**
     *
     * @return {string}
     */
    getQueueName() {
        return UploadAmqpSender.QUEUE;
    }
}
