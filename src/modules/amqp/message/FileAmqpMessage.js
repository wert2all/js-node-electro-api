import AmqpMessageJsonAdapter from "../../../lib/amqp/message/adapter/AmqpMessageJsonAdapter";

/**
 * @class FileAmqpMessage
 * @type AmqpMessageInterface
 * @extends AmqpMessageJsonAdapter
 */
export default class FileAmqpMessage extends AmqpMessageJsonAdapter {
    /**
     *
     * @param {string} entityId
     */
    constructor(entityId) {
        super({
            entity_id: entityId,
        });
        /**
         *
         * @type {string}
         * @private
         */
        this._entityid = entityId;
    }

    /**
     *
     * @return {string}
     */
    getEntityId() {
        return this._entityid;
    }
}
