import ImplementationError from '../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ServerWorkerInterface
 */
export default class ServerWorkerInterface {

    /**
     * @abstract
     * @param connection
     */
    // eslint-disable-next-line no-unused-vars
    run(connection) {
        throw new ImplementationError(this, 'run');
    }
}
