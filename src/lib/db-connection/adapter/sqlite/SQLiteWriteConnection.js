import WriteConnectionInterface from "../../WriteConnectionInterface";
import SQLiteInsertSQLBuilder from "./builder/SQLiteInsertSQLBuilder";
import SQLiteUpdateSQLBuilder from "./builder/SQLiteUpdateSQLBuilder";
import SQLiteDeleteSQLBuilder from "./builder/SQLiteDeleteSQLBuilder";
import QueryDataProvider from "./QueryDataProvider";
import QueryExecutor from "./QueryExecutor";
import TableCreator from "./TableCreator";

/**
 * @class SQLiteWriteConnection
 * @extends WriteConnectionInterface
 * @type WriteConnectionInterface
 */
export default class SQLiteWriteConnection extends WriteConnectionInterface {
    /**
     *
     * @param serverConnect
     */
    constructor(serverConnect = null) {
        super();

        /**
         *
         * @type {SQLiteInsertSQLBuilder}
         * @private
         */
        this._builderInsert = new SQLiteInsertSQLBuilder();
        /**
         *
         * @type {SQLiteUpdateSQLBuilder}
         * @private
         */
        this._builderUpdate = new SQLiteUpdateSQLBuilder();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderDelete = new SQLiteDeleteSQLBuilder();
        /**
         *
         * @type {QueryDataProvider}
         * @private
         */
        this._queryDataProvider = new QueryDataProvider();
        /**
         *
         * @type {QueryExecutor}
         * @private
         */
        this._queryExecutor = new QueryExecutor();
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
     * @param {string} primaryValue
     * @return {Promise<void>}
     */
    async delete(definition, primaryValue) {
        const whereData = {};
        whereData[definition.getPrimaryColumn().getColumnName()] = primaryValue;
        const sql = this._builderDelete.buildSQL(definition, whereData);
        const prepareValues = this._queryDataProvider.buildQueryData(definition, whereData);
        return this._queryExecutor.exec(sql, prepareValues);
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
        return Promise.resolve(insertData.lastID);
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

    /**
     *
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        this._queryExecutor.setDispatcher(dispatcher);
    }
}
