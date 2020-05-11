import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';
import DefinitionColumn from '../../lib/db-definition/DefinitionColumn';

/**
 * @class UserProfileDefinition
 * @extends DefinitionTableInterface
 * @type DefinitionTableInterface
 */
export default class UserProfileDefinition extends DefinitionTableInterface {
    static TABLE_NAME = 'user_profile';
    static COLUMN_ID = 'id';
    static COLUMN_GOOGLE_ID = 'google_user_id';
    static COLUMN_VALUE_TYPE = 'value_type';
    static COLUMN_VALUE_NAME = 'value_name';
    static COLUMN_VALUE_VALUE = 'value';

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
            false,
            false,
            true
        );

        this._columns = [
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_GOOGLE_ID,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_TYPE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_NAME,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                false,
                false,
                false
            ),
            new DefinitionColumn(
                UserProfileDefinition.COLUMN_VALUE_VALUE,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                false,
                false,
                false
            ),
        ];
    }

    /**
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        return [];
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
}