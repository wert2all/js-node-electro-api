import AmqpMessageJsonAdapter from "../../../lib/amqp/message/adapter/AmqpMessageJsonAdapter";

/**
 * @class UploadAmqpMessage
 * @type AmqpMessageInterface
 * @extends AmqpMessageJsonAdapter
 */
export default class UploadAmqpMessage extends AmqpMessageJsonAdapter {
    /**
     *
     * @param {string} entityId
     */
    constructor(entityId) {
        super({
            entityId: entityId,
        });
    }
}
