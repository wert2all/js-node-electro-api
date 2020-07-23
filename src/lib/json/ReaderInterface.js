import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class ReaderInterface
 */
export default class ReaderInterface {
    /**
     * @abstract
     * @return {Object<string, string>}
     */
    read() {
        throw new ImplementationError(this, 'read');
    }
}
