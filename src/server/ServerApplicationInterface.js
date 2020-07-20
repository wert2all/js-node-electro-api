import ImplementationError from '../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ServerApplicationInterface
 */
export default class ServerApplicationInterface {
    /**
     * @abstract
     * @return ServerApplicationInterface
     */
    // eslint-disable-next-line no-unused-vars
    init() {
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
