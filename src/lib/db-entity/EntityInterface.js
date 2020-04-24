import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @class EntityInterface
 * @abstract
 */
export default class EntityInterface {
    static ROW_ID = 'rowId';

    /**
     * @abstract
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    // eslint-disable-next-line no-unused-vars
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
     * @abstract
     * @param {string} key
     * @return {string|null}
     */
    // eslint-disable-next-line no-unused-vars
    getValue(key) {
        throw new ImplementationError(this, 'getValue');
    }

    /**
     *
     * @param {string} key
     * @param {string} value
     * @return {EntityInterface}
     */
    // eslint-disable-next-line no-unused-vars
    setValue(key, value) {
        throw new ImplementationError(this, 'setValue');
    }
}
