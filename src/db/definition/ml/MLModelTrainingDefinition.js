import DefinitionTableInterface from "../../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../../lib/db-definition/DefinitionColumn";

/**
 * @class MLModelTrainingDefinition
 * @extends DefinitionTableInterface
 * @type DefinitionTableInterface
 */
export default class MLModelTrainingDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "ml_training";
    static COLUMN_ID = "id";
    static COLUMN_ML_ALIAS = "ml_alias";
    static COLUMN_ENTITY_ID = "entity_id";

    constructor() {
        super();
        this._primaryColumn = new DefinitionColumn(
            MLModelTrainingDefinition.COLUMN_ID,
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
                MLModelTrainingDefinition.COLUMN_ML_ALIAS,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                20,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                MLModelTrainingDefinition.COLUMN_ENTITY_ID,
                DefinitionColumn.COLUMN_TYPE_INTEGER,
                64,
                false,
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
        return MLModelTrainingDefinition.TABLE_NAME;
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
