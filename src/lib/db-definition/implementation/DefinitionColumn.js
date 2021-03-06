import DefinitionColumnInterface from "../DefinitionColumnInterface";

/**
 * @class DefinitionColumn
 * @type DefinitionColumnInterface
 * @extends DefinitionColumnInterface
 */
export default class DefinitionColumn extends DefinitionColumnInterface {
    static COLUMN_TYPE_VARCHAR = "varchar";
    static COLUMN_TYPE_INTEGER = "INTEGER";

    /**
     *
     * @param {string} columnName
     * @param {string} columnType
     * @param {number|null} size
     * @param {boolean} isNull
     * @param {string|boolean} defaultValue
     * @param {boolean} isPrimary
     * @param {{}} attributes
     */
    constructor(
        columnName,
        columnType,
        size = null,
        isNull = true,
        defaultValue = false,
        isPrimary = false,
        attributes = {}
    ) {
        super();
        /**
         *
         * @type {number|null}
         * @private
         */
        this._size = size;
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
        /**
         *
         * @type {{}}
         * @private
         */
        this._attributes = attributes;
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

    /**
     *
     * @return {number|null}
     */
    getColumnSize() {
        return this._size;
    }

    /**
     *
     * @return {{}}
     */
    getAttributes() {
        return this._attributes;
    }
}
