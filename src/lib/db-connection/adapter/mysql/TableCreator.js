import MysqlTableSQLBuilder from "./builder/MysqlTableSQLBuilder";

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
         * @type {MysqlTableSQLBuilder}
         * @private
         */
        this._builderCreateTable = new MysqlTableSQLBuilder();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @return {Promise<void>}

     */
    async createTable(definition) {
        const tableSQl = this._builderCreateTable.buildSQL(definition, null);
        console.log(tableSQl);
        return this._queryExecutor.exec(tableSQl, {});
    }
}
