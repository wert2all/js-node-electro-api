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
     * @param {AmqpMessageFactoryInterface} messageFactory
     * @returns {AmqpConsumerInterface}
     */
    create(messageFactory) {
        throw new ImplementationError(this, "create");
    }
}
