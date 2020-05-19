import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class EventInterface
 */
export default class EventInterface {
    /**
     * @abstract
     * @return {String}
     */
    getEventName() {
        throw new ImplementationError(this, 'getEventName');
    }
}
