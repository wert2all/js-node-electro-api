import AmqpMessageJsonAdapter from "../../../lib/amqp/message/adapter/AmqpMessageJsonAdapter";

export default class ChangeImageAmqpMessage extends AmqpMessageJsonAdapter {
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
