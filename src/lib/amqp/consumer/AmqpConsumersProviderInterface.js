import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpConsumersProviderInterface
 */
export default class AmqpConsumersProviderInterface {
    /**
     * @abstract
     * @param {AmqpSenderInterface} sender
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @param {AmqpConsumerFactoryInterface} consumerFactory
     * @returns {AmqpConsumersProviderInterface}
     */
    register(sender, messageFactory, consumerFactory) {
        throw new ImplementationError(this, "register");
    }

    /**
     * @abstract
     * @param {string} queueName
     * @return {AmqpConsumerInterface|null}
     */
    get(queueName) {
        throw new ImplementationError(this, "get");
    }

    /**
     * @abstract
     * @return {string[]}
     */
    getQueues() {
        throw new ImplementationError(this, "getQueues");
    }
}
