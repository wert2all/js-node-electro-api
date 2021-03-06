import DefinitionTableInterface from "../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../lib/db-definition/implementation/DefinitionColumn";

/**
 * @class UserDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "users";
    static COLUMN_GOOGLE_ID = "google_user_id";
    static COLUMN_GOOGLE_NAME = "name";
    static COLUMN_GOOGLE_EMAIL = "email";
    static COLUMN_IS_ADMIN = "isAdmin";
    static COLUMN_PHOTO_PATH = "photo";

    constructor() {
        super();
        /**
         *
         * @type {DefinitionColumn}
         * @private
         */
        this._primaryColumn = new DefinitionColumn(
            UserDefinition.COLUMN_GOOGLE_ID,
            DefinitionColumn.COLUMN_TYPE_VARCHAR,
            30,
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
                UserDefinition.COLUMN_GOOGLE_NAME,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                50,
                true,
                "",
                false
            ),
            new DefinitionColumn(
                UserDefinition.COLUMN_GOOGLE_EMAIL,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                50,
                true,
                "",
                false
            ),
            new DefinitionColumn(
                UserDefinition.COLUMN_IS_ADMIN,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                2,
                false,
                "n",
                false
            ),
            new DefinitionColumn(
                UserDefinition.COLUMN_PHOTO_PATH,
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
        return UserDefinition.TABLE_NAME;
    }

    /**
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        return this._columns;
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
     * @return {DefinitionIndexInterface[]}
     */
    getIndexes() {
        return [];
    }

    /**
     * @return {DefinitionForeignKeyInterface[]}
     */
    getForeignKeys() {
        return [];
    }
}
