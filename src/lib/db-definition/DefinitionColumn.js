import DefinitionColumnInterface from './DefinitionColumnInterface';

/**
 * @class DefinitionColumn
 * @type DefinitionColumnInterface
 * @extends DefinitionColumnInterface
 */
export default class DefinitionColumn extends DefinitionColumnInterface {
    /**
     *
     * @param {string} columnName
     */
    constructor(columnName) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._columnName = columnName;
    }

    /**
     * @return {string}
     */
    getColumnName() {
        return this._columnName;
    }
}
