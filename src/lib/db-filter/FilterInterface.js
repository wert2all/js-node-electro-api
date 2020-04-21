import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class FilterInterface
 */
export default class FilterInterface {
    /**
     * @abstract
     * @param {DefinitionColumnInterface} column
     * @param {string} value
     */
    addColumn(column, value) {
        throw new ImplementationError(this, 'addFilterData');
    }
}
