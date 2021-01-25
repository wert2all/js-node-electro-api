import ObserverInterface from "../../../../lib/dispatcher/ObserverInterface";
import UserFilesDefinition from "../../../../db/definition/UserFilesDefinition";

/**
 * @class ImageChangeAmqpObserver
 * @extends ObserverInterface
 * @type ObserverInterface
 */
export default class ImageChangeAmqpObserver extends ObserverInterface {
    /**
     *
     * @param {AmqpSenderInterface} amqp
     * @param {AmqpMessageFactoryInterface} factory
     */
    constructor(amqp, factory) {
        super();
        /**
         *
         * @type {AmqpSenderInterface}
         * @private
         */
        this._amqp = amqp;
        /**
         *
         * @type {AmqpMessageFactoryInterface}
         * @private
         */
        this._factory = factory;
    }

    notify(event) {
        return this._amqp.send(
            this._factory.create({ entity_id: event.getEventData().getValue(UserFilesDefinition.COLUMN_ID) })
        );
    }
}
