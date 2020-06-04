import ImplementationError from '../../lib/implementation-error/ImplementationError';

/**
 * @class KeyValueStorageInterface
 * @abstract
 * @interface
 */
export default class KeyValueStorageInterface {
    /**
     *
     * @param {string} key
     * @return {*}
     */
    // eslint-disable-next-line no-unused-vars
    fetch(key) {
        throw new ImplementationError(this, 'fetch');
    }
}
