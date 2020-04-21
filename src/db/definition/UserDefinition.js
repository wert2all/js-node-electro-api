import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';

/**
 * @class UserDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserDefinition extends DefinitionTableInterface {
    static TABLE_NAME = 'users';
    static COLUMN_GOOGLE_ID = 'google_user_id';

    /**
     *
     * @return {string}
     */
    getTableName() {
        return UserDefinition.TABLE_NAME;
    }
}
