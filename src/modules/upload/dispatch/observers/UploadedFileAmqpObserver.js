import ObserverInterface from "../../../../lib/dispatcher/ObserverInterface";
import UserFilesDefinition from "../../../../db/definition/UserFilesDefinition";

/**
 * @class UploadedFileAmqpObserver
 * @type ObserverInterface
 * @extends ObserverInterface
 */
export default class UploadedFileAmqpObserver extends ObserverInterface {
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
        /**
         *
         * @type {UserFilesEntity}
         */
        const userFilesEntity = event.getEventData();
        const id = userFilesEntity.getValue(UserFilesDefinition.COLUMN_ID);
        return this._amqp.send(this._factory.create({ entity_id: id }));
    }
}
