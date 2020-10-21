import WriteConnectionInterface from "../../WriteConnectionInterface";
import QueryExecutor from "./QueryExecutor";
import MysqlQueryDataProvider from "./MysqlQueryDataProvider";
import MysqlInsertSQLBuilder from "./builder/MysqlInsertSQLBuilder";
import MysqlUpdateSQLBuilder from "./builder/MysqlUpdateSQLBuilder";

/**
 * @class MysqlWriteConnection
 * @extends WriteConnectionInterface
 * @type WriteConnectionInterface
 */
export default class MysqlWriteConnection extends WriteConnectionInterface {
    constructor() {
        super();
        /**
         *
         * @type {QueryExecutor}
         * @private
         */
        this._queryExecutor = new QueryExecutor();
        /**
         *
         * @type {MysqlQueryDataProvider}
         * @private
         */
        this._queryDataProvider = new MysqlQueryDataProvider();
        /**
         *
         * @type {MysqlInsertSQLBuilder}
         * @private
         */
        this._builderInsert = new MysqlInsertSQLBuilder();
        /**
         *
         * @type {MysqlUpdateSQLBuilder}
         * @private
         */
        this._builderUpdate = new MysqlUpdateSQLBuilder();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        this._queryExecutor.setDispatcher(dispatcher);
    }

    /**
     *
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._queryExecutor.setServer(serverConnection);
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<string>}
     */
    // eslint-disable-next-line no-unused-vars
    async insert(definition, data) {
        const sql = this._builderInsert.buildSQL(definition, data);
        const prepareValues = this._queryDataProvider.buildQueryData(definition, data);
        const insertData = await this._queryExecutor.exec(sql, prepareValues);
        return Promise.resolve(insertData.insertId);
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<void>}
     */
    async update(definition, data) {
        const sql = this._builderUpdate.buildSQL(definition, data);
        const prepareValues = this._queryDataProvider.buildQueryData(definition, data);
        delete prepareValues[definition.getPrimaryColumn().getColumnName()];
        return this._queryExecutor.exec(sql, prepareValues);
    }
}
