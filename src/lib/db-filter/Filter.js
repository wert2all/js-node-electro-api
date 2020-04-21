import FilterInterface from './FilterInterface';
import FilterData from './FilterData';

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

    /**
     *
     * @return {Array<FilterData>}
     */
    getFilterData() {
        return Object.keys(this._filters)
            .map(key => new FilterData(key, '=', this._filters[key]));
    }
}
