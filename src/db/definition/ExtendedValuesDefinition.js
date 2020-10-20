import DefinitionTableInterface from "../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../lib/db-definition/DefinitionColumn";

/**
 * @class ExtendedValuesDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class ExtendedValuesDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "ext_values";
    static COLUMN_ID = "id";
    static COLUMN_ENTITY_ID = "entity_id";
    static COLUMN_ENTITY_TYPE = "entity_type";
    static COLUMN_VALUE_NAME = "entity_value_name";
    static COLUMN_VALUE_VALUE = "entity_value_value";

    constructor() {
        super();

        this._primaryColumn = new DefinitionColumn(
            ExtendedValuesDefinition.COLUMN_ID,
            DefinitionColumn.COLUMN_TYPE_INTEGER,
            null,
            false,
            false,
            true
        );

        /**
         *
         * @type {DefinitionColumnInterface[]}
         * @private
         */
        this._columns = [
            this._primaryColumn,
            new DefinitionColumn(
                ExtendedValuesDefinition.COLUMN_ENTITY_ID,
                DefinitionColumn.COLUMN_TYPE_INTEGER,
                null,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                ExtendedValuesDefinition.COLUMN_ENTITY_TYPE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                null,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                ExtendedValuesDefinition.COLUMN_VALUE_NAME,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                null,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                ExtendedValuesDefinition.COLUMN_VALUE_VALUE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                null,
                true,
                false,
                false
            ),
        ];
    }

    /**
     *
     * @return {string}
     */
    getTableName() {
        return ExtendedValuesDefinition.TABLE_NAME;
    }

    /**
     *
     * @return {DefinitionColumn}
     */
    getPrimaryColumn() {
        return this._primaryColumn;
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    isColumn(key) {
        return this.getColumns()
            .map((definition) => definition.getColumnName())
            .includes(key);
    }

    /**
     *
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        return this._columns;
    }
}
