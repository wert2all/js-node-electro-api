import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';
import DefinitionColumn from '../../lib/db-definition/DefinitionColumn';

/**
 * @class UserDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserDefinition extends DefinitionTableInterface {
    static TABLE_NAME = 'users';
    static COLUMN_GOOGLE_ID = 'google_user_id';
    static COLUMN_GOOGLE_NAME = 'name';
    static COLUMN_GOOGLE_EMAIL = 'email';

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
                true,
                '',
                false
            ),
            new DefinitionColumn(
                UserDefinition.COLUMN_GOOGLE_EMAIL,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                true,
                '',
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

}
