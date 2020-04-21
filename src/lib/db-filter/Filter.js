import FilterInterface from './FilterInterface';

/**
 * @class Filter
 * @type FilterInterface
 * @extends FilterInterface
 */
export default class Filter extends FilterInterface {
    constructor() {
        super();
        /**
         *
         * @type {Object<string, string>}
         * @private
         */
        this._filters = {};
    }

    /**
     * @param {DefinitionColumnInterface} column
     * @param {string} value
     */
    addColumn(column, value) {
        this._filters[column.getColumnName()] = value;
    }
}
