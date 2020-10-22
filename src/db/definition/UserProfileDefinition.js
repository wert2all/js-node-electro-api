import DefinitionTableInterface from "../../lib/db-definition/DefinitionTableInterface";
import DefinitionColumn from "../../lib/db-definition/implementation/DefinitionColumn";
import DefinitionIndex from "../../lib/db-definition/implementation/DefinitionIndex";
import DefinitionForeignKey from "../../lib/db-definition/implementation/DefinitionForeignKey";
import UserDefinition from "./UserDefinition";

/**
 * @class UserProfileDefinition
 * @extends DefinitionTableInterface
 * @type DefinitionTableInterface
 */
export default class UserProfileDefinition extends DefinitionTableInterface {
    static TABLE_NAME = "user_profile";
    static COLUMN_ID = "id";
    static COLUMN_GOOGLE_USER_ID = "google_user_id";
    static COLUMN_VALUE_TYPE = "value_type";
    static COLUMN_VALUE_NAME = "value_name";
    static COLUMN_VALUE_VALUE = "value";

    constructor() {
        super();

        /**
         *
         * @type {DefinitionColumn}
         * @private
         */
        this._primaryColumn = new DefinitionColumn(
            UserProfileDefinition.COLUMN_ID,
            DefinitionColumn.COLUMN_TYPE_INTEGER,
            11,
            false,
            false,
            true,
            {
                autoincrement: true,
            }
        );

        this._columns = [
            this._primaryColumn,
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_GOOGLE_USER_ID,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                30,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_TYPE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                20,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_NAME,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                20,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_VALUE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                255,
                false,
                false,
                false
            ),
        ];
        /**
         *
         * @type {DefinitionForeignKeyInterface[]}
         * @private
         */
        this._foreignKeys = [
            new DefinitionForeignKey(
                [UserProfileDefinition.COLUMN_GOOGLE_USER_ID],
                new UserDefinition(),
                [UserDefinition.COLUMN_GOOGLE_ID],
                [
                    {
                        action: "cascade",
                        actionName: "delete",
                    },
                ]
            ),
        ];
    }

    /**
     * @return {DefinitionForeignKeyInterface[]}
     */
    getForeignKeys() {
        return this._foreignKeys;
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
     *
     * @return {string}
     */
    getTableName() {
        return UserProfileDefinition.TABLE_NAME;
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
        return [
            new DefinitionIndex(
                [
                    UserProfileDefinition.COLUMN_GOOGLE_USER_ID,
                    UserProfileDefinition.COLUMN_VALUE_TYPE,
                    UserProfileDefinition.COLUMN_VALUE_NAME,
                ],
                true
            ),
        ];
    }
}
