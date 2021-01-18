import ImplementationError from "../../implementation-error/ImplementationError";
/**
 * @class ConnectionFactoryInterface
 * @interface
 * @abstract
 */
export default class ConnectionFactoryInterface {
    /**
     * @abstract
     * @returns {Promise}
     */
    async factory() {
        throw new ImplementationError(this, "getConnectionFactory");
    }
}
