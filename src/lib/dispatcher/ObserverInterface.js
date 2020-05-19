import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ObserverInterface
 */
export default class ObserverInterface {
    /**
     * @abstract
     * @param {EventInterface} event
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    notify(event) {
        throw new ImplementationError(this, 'notify');
    }
}
