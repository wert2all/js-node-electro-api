import ImplementationError from '../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ServerApplicationInterface
 */
export default class ServerApplicationInterface {
    /**
     * @abstract
     * @param connection
     * @return ServerApplicationInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(connection) {
        throw new ImplementationError(this, 'init');
    }

    /**
     * @abstract
     * @return ServerApplicationInterface
     */
    run() {
        throw new ImplementationError(this, 'run');
    }

    /**
     * @abstract
     * @return {*}
     */
    getRequestListener() {

    }
}
