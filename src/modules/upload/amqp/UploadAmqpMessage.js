import AmqpMessageInterface from "../../../lib/amqp/message/AmqpMessageInterface";

/**
 * @class UploadAmqpMessage
 * @type AmqpMessageInterface
 * @extends AmqpMessageInterface
 */
export default class UploadAmqpMessage extends AmqpMessageInterface {
    /**
     *
     * @param {string} entityId
     */
    constructor(entityId) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._entityId = entityId;
    }

    /**
     *
     * @return {string}
     */
    toString() {
        return JSON.stringify({
            entityId: this._entityId,
        });
    }
}
