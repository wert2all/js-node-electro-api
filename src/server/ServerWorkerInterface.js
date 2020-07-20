import ImplementationError from '../lib/implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ServerWorkerInterface
 */
export default class ServerWorkerInterface {

    /**
     * @abstract
     */
    run() {
        throw new ImplementationError(this, 'run');
    }
}
