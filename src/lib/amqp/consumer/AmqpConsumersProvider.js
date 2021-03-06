import AmqpConsumersProviderInterface from "./AmqpConsumersProviderInterface";

/**
 * @class AmqpConsumersProvider
 * @extends AmqpConsumersProviderInterface
 * @type AmqpConsumersProviderInterface
 */
export default class AmqpConsumersProvider extends AmqpConsumersProviderInterface {
    constructor() {
        super();
        /**
         *
         * @type {{}}
         * @private
         */
        this._consumers = {};
    }

    /**
     * @param {AmqpSenderInterface} sender
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @param {AmqpConsumerFactoryInterface} consumerFactory
     * @returns {AmqpConsumersProviderInterface}
     */
    register(sender, messageFactory, consumerFactory) {
        this._consumers[sender.getQueueName()] = consumerFactory.create(sender.getQueueName(), messageFactory);
        return this;
    }

    /**
     *
     * @param {string} queueName
     * @return {null|AmqpConsumerInterface}
     */
    get(queueName) {
        if (this._consumers.hasOwnProperty(queueName)) {
            return this._consumers[queueName];
        } else {
            return null;
        }
    }

    /**
     *
     * @return {string[]}
     */
    getQueues() {
        return Object.keys(this._consumers);
    }
}
