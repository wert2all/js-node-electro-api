import ImplementationError from "../../../implementation-error/ImplementationError";

/**
 * @interface
 * @class AmqpConsumeHandlerInterface
 */
export default class AmqpConsumeHandlerInterface {
    /**
     * @abstract
     * @param channel
     * @param message
     */
    fire(channel, message) {
        throw new ImplementationError(this, "fire");
    }
}
