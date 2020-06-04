/**
 * @class ResponseProcessorInterface
 * @interface
 * @abstract
 */
import ImplementationError from '../../lib/implementation-error/ImplementationError';

export default class ResponseProcessorInterface {

    /**
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    send(response) {
        throw new ImplementationError(this, 'send');
    }
}
