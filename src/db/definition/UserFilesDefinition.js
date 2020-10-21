import DefinitionTableInterface from "../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../lib/db-definition/DefinitionColumn";

/**
 * @class UserFilesDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserFilesDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "user_files";
    static COLUMN_ID = "id";
    static COLUMN_GOOGLE_USER_ID = "google_user_id";
    static COLUMN_YEARMON = "yearmon";
    static COLUMN_TYPE = "type";
    static COLUMN_PATH = "path";
    static COLUMN_IS_READY = "isReady";

    constructor() {
        super();
        /**
         *
         * @type {DefinitionColumn}
         * @private
         */
        this._primaryColumn = new DefinitionColumn(
            UserFilesDefinition.COLUMN_ID,
            DefinitionColumn.COLUMN_TYPE_INTEGER,
            11,
            false,
            false,
            true
        );
        this._columns = [
            this._primaryColumn,
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_GOOGLE_USER_ID,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                30,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_YEARMON,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                6,
                false,
                false
            ),
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_TYPE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                20,
                false,
                "bill"
            ),
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_PATH,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                255,
                false,
                false
            ),
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_IS_READY,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                6,
                false,
                "false"
            ),
        ];
    }

    /**
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        return this._columns;
    }

    /**
     *
     * @return {string}
     */
    getTableName() {
        return UserFilesDefinition.TABLE_NAME;
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
}
