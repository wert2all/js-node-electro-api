import AmqpSenderInterface from "../../../lib/amqp/sender/AmqpSenderInterface";

/**
 * @class UploadAmqpProducer
 * @extends  AmqpSenderInterface
 * @type AmqpSenderInterface
 */
export default class UploadAmqpProducer extends AmqpSenderInterface {
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
        return UploadAmqpProducer.QUEUE;
    }
}
