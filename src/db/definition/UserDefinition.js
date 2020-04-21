import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';

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

    /**
     *
     * @return {string}
     */
    getTableName() {
        return UserDefinition.TABLE_NAME;
    }
}
