import MysqlTableSQLBuilder from "./builder/MysqlTableSQLBuilder";
import TableCreatorInterface from "../../tables/TableCreatorInterface";

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
        return this._queryExecutor.exec(tableSQl, []);
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }
}
