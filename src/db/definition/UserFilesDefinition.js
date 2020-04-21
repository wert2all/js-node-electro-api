import DefinitionTableInterface from '../../lib/db-definition/DefinitionTableInterface';
import DefinitionColumn from '../../lib/db-definition/DefinitionColumn';

/**
 * @class UserFilesDefinition
 * @type DefinitionTableInterface
 * @extends DefinitionTableInterface
 */
export default class UserFilesDefinition extends DefinitionTableInterface {
    static COLUMN_GOOGLE_USER_ID = 'google_user_id';

    constructor() {
        super();
        this._columns = [
            new DefinitionColumn(UserFilesDefinition.COLUMN_GOOGLE_USER_ID)
        ];
    }

    /**
     * @return {DefinitionColumnInterface[]}
     */
    getColumns() {
        return this._columns;
    }
}
