import ImplementationError from "../../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class AmqpMessageFactoryInterface
 */
export default class AmqpMessageFactoryInterface {
    /**
     * @abstract
     * @param {{}} object
     * @return {AmqpMessageInterface|null}
     * @throws Error
     */
    create(object) {
        throw new ImplementationError(this, "create");
    }

    /**
     * @abstract
     * @param message
     * @return {AmqpMessageInterface|null}
     */
    fromMessage(message) {
        throw new ImplementationError(this, "fromMessage");
    }
}
