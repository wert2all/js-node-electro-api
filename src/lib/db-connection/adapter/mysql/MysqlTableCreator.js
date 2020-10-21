import MysqlTableSQLBuilder from "./builder/MysqlTableSQLBuilder";
import TableCreatorInterface from "../../tables/TableCreatorInterface";
import MysqlIndexSQLBuilder from "./builder/MysqlIndexSQLBuilder";

/**
 * @class MysqlTableCreator
 * @extends TableCreatorInterface
 * @type TableCreatorInterface
 */
export default class MysqlTableCreator extends TableCreatorInterface {
    /**
     *
     * @param {MysqlQueryExecutor} queryExecutor
     */
    constructor(queryExecutor) {
        super();
        /**
         *
         * @type {MysqlQueryExecutor}
         * @private
         */
        this._queryExecutor = queryExecutor;
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderCreateTable = new MysqlTableSQLBuilder();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderIndex = new MysqlIndexSQLBuilder();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @return {Promise<void>}

     */
    async createTable(definition) {
        const tableSQl = this._builderCreateTable.buildSQL(definition, null);
        const indexes = definition
            .getIndexes()
            .map((index) => this._builderIndex.buildSQL(definition, index.toHash()))
            .filter((sql) => sql !== "");
        return this._queryExecutor.exec(tableSQl, []).then(() => {
            if (indexes.length > 0) {
                return Promise.all(indexes.map((indexSql) => this._queryExecutor.exec(indexSql, []))).then(() => null);
            }
            return null;
        });
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }
}
