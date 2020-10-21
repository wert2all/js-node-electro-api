import SQLiteTableSQLBuilder from "./builder/SQLiteTableSQLBuilder";
import TableCreatorInterface from "../../tables/TableCreatorInterface";

/**
 * @class TableCreator
 * @extends TableCreatorInterface
 * @type TableCreatorInterface
 */
export default class TableCreator extends TableCreatorInterface {
    /**
     *
     * @param {QueryExecutor} queryExecutor
     */
    constructor(queryExecutor) {
        super();
        /**
         *
         * @type {QueryExecutor}
         * @private
         */
        this._queryExecutor = queryExecutor;
        /**
         *
         * @type {SQLiteTableSQLBuilder}
         * @private
         */
        this._builderCreateTable = new SQLiteTableSQLBuilder();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @return {Promise<void>}

     */
    async createTable(definition) {
        const tableSQl = this._builderCreateTable.buildSQL(definition, null);
        return this._queryExecutor.exec(tableSQl, {});
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }
}
