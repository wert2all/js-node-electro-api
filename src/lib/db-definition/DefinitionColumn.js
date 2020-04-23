import DefinitionColumnInterface from './DefinitionColumnInterface';

/**
 * @class DefinitionColumn
 * @type DefinitionColumnInterface
 * @extends DefinitionColumnInterface
 */
export default class DefinitionColumn extends DefinitionColumnInterface {
    static COLUMN_TYPE_VARCHAR = 'varchar';
    static COLUMN_TYPE_INTEGER = 'INTEGER';


    /**
     *
     * @param {string} columnName
     * @param {string} columnType
     * @param {boolean} isNull
     * @param {string|boolean} defaultValue
     * @param {boolean} isPrimary
     */
    constructor(
        columnName,
        columnType,
        isNull = true,
        defaultValue = false,
        isPrimary = false
    ) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._columnName = columnName;
        /**
         *
         * @type {string}
         * @private
         */
        this._columnType = columnType;
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isNull = isNull;
        /**
         *
         * @type {boolean|string}
         * @private
         */
        this._default = defaultValue;
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isPrimary = isPrimary;
    }

    /**
     * @return {string}
     */
    getColumnName() {
        return this._columnName;
    }

    /**
     * @return {string}
     */
    getType() {
        return this._columnType;
    }

    /**
     *
     * @return boolean
     */
    isNull() {
        return this._isNull;
    }

    /**
     * @return {*|boolean}
     */
    getDefault() {
        return this._default;
    }

    /**
     * @return boolean
     */
    isPrimary() {
        return this._isPrimary;
    }
}
