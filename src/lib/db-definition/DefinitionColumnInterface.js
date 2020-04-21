import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class DefinitionColumnInterface
 */
export default class DefinitionColumnInterface {
    /**
     * @abstract
     * @return {string}
     */
    getColumnName() {
        throw new ImplementationError(this, 'getColumnName');
    }

    /**
     * @abstract
     * @return {string}
     */
    getType() {
        throw new ImplementationError(this, 'getType');
    }

    /**
     * @abstract
     * @return boolean
     */
    isNull() {
        throw new ImplementationError(this, 'isNull');
    }

    /**
     * @abstract
     * @return {*|boolean}
     */
    getDefault() {
        throw new ImplementationError(this, 'getDefault');
    }

    /**
     * @abstract
     * @return boolean
     */
    isPrimary() {
        throw new ImplementationError(this, 'isPrimary');
    }
}
