import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @class ConnectionInterface
 * @interface
 * @abstract
 */
export default class ConnectionInterface {
    /**
     * @abstract
     * @returns Promise<bool>
     */
    ping() {
        throw new ImplementationError(this, "ping");
    }

    /**
     * @abstract
     * @returns {ConnectionFactoryInterface}
     */
    getConnectionFactory() {
        throw new ImplementationError(this, "getConnectionFactory");
    }

    /**
     * @return {Promise<*|null>}
     * @abstract
     */
    getConnection() {
        throw new ImplementationError(this, "getConnection");
    }
}
