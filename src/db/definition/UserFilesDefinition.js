import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';
import DefinitionColumn from '../../lib/db-definition/DefinitionColumn';
import ImplementationError from '../../lib/implementation-error/ImplementationError';

/**
 * @class UserFilesDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserFilesDefinition extends DefinitionTableInterface {
    static TABLE_NAME = 'user_files';
    static COLUMN_GOOGLE_USER_ID = 'google_user_id';

    constructor() {
        super();
        this._columns = [
            new DefinitionColumn(
                UserFilesDefinition.COLUMN_GOOGLE_USER_ID,
                DefinitionColumn.COLUMN_TYPE_VARCHAR,
                false,
                false,
                true
            )
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
}
