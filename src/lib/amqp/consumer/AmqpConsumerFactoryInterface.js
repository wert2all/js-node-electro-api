import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpConsumerFactoryInterface
 */
export default class AmqpConsumerFactoryInterface {
    /**
     *
     * @abstract
     * @param {string} queueName
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @returns {AmqpConsumerInterface}
     */
    create(queueName, messageFactory) {
        throw new ImplementationError(this, "create");
    }
}
