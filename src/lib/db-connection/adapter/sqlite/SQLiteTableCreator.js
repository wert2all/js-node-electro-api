import SQLiteTableSQLBuilder from "./builder/SQLiteTableSQLBuilder";
import TableCreatorInterface from "../../tables/TableCreatorInterface";

/**
 * @class SQLiteTableCreator
 * @extends TableCreatorInterface
 * @type TableCreatorInterface
 */
export default class SQLiteTableCreator extends TableCreatorInterface {
    /**
     *
     * @param {SQLiteQueryExecutor} queryExecutor
     */
    constructor(queryExecutor) {
        super();
        /**
         *
         * @type {SQLiteQueryExecutor}
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
