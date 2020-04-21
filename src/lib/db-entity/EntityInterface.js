import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @class EntityInterface
 * @abstract
 */
export default class EntityInterface {
    /**
     * @abstract
     * @param {{}}value
     * @return EntityInterface
     */
    create(value) {
        throw new ImplementationError(this, 'create');
    }

    /**
     * @abstract
     * @return {Object<string, string>}
     */
    getData() {
        throw new ImplementationError(this, 'getData');
    }

    /**
     *
     * @param {string} key
     * @return {string|null}
     */
    getValue(key) {
        throw new ImplementationError(this, 'getValue');
    }
}
