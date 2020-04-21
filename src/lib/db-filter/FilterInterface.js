import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @class FilterInterface
 */
export default class FilterInterface {
    /**
     *
     * @param {DefinitionColumnInterface} column
     * @param {string} value
     */
    addColumn(column, value) {
        throw new ImplementationError(this, 'addFilterData');
    }
}
