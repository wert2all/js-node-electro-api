import SQLiteTableSQLBuilder from "./builder/SQLiteTableSQLBuilder";

/**
 * @class TableCreator
 */
export default class TableCreator {
    /**
     *
     * @param {QueryExecutor} queryExecutor
     */
    constructor(queryExecutor) {
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
}
