import DefinitionTableInterface from "../../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../../lib/db-definition/DefinitionColumn";

export default class MLModelLoggingDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "ml_logging";
    static COLUMN_ID = "id";
    static COLUMN_ML_ALIAS = "ml_alias";
    static COLUMN_ENTITY_ID = "entity_id";
    static COLUMN_STATUS = "status";
    static COLUMN_LOG_MESSAGE = "message";

    constructor() {
        super();
        this._primaryColumn = new DefinitionColumn(
            MLModelLoggingDefinition.COLUMN_ID,
            DefinitionColumn.COLUMN_TYPE_INTEGER,
            11,
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
                MLModelLoggingDefinition.COLUMN_ML_ALIAS,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                20,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                MLModelLoggingDefinition.COLUMN_ENTITY_ID,
                DefinitionColumn.COLUMN_TYPE_INTEGER,
                64,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                MLModelLoggingDefinition.COLUMN_STATUS,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                10,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                MLModelLoggingDefinition.COLUMN_LOG_MESSAGE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                255,
                true,
                "",
                false
            ),
        ];
    }

    /**
     *
     * @return {string}
     */
    getTableName() {
        return MLModelLoggingDefinition.TABLE_NAME;
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

    /**
     * @return {DefinitionIndexInterface[]}
     */
    getIndexes() {
        return [];
    }
}
