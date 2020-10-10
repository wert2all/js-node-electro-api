import ImplementationError from "../implementation-error/ImplementationError";

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
    // eslint-disable-next-line no-unused-vars
    addColumn(column, value) {
        throw new ImplementationError(this, "addFilterData");
    }

    /**
     * @abstract
     * @return {Array<FilterData>}
     */
    getFilterData() {
        throw new ImplementationError(this, "getFilterData");
    }
}
