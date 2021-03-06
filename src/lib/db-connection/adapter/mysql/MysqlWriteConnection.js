import WriteConnectionInterface from "../../WriteConnectionInterface";
import MysqlQueryExecutor from "./MysqlQueryExecutor";
import MysqlQueryDataProvider from "./MysqlQueryDataProvider";
import MysqlInsertSQLBuilder from "./builder/MysqlInsertSQLBuilder";
import MysqlUpdateSQLBuilder from "./builder/MysqlUpdateSQLBuilder";
import MysqlDeleteSQLBuilder from "./builder/MysqlDeleteSQLBuilder";

/**
 * @class MysqlWriteConnection
 * @extends WriteConnectionInterface
 * @type WriteConnectionInterface
 */
export default class MysqlWriteConnection extends WriteConnectionInterface {
    /**
     *
     * @param {ConnectionInterface} connectionDelegate
     */
    constructor(connectionDelegate) {
        super();
        /**
         *
         * @type {ConnectionInterface}
         * @private
         */
        this._connectionDelegate = connectionDelegate;
        /**
         *
         * @type {MysqlQueryExecutor}
         * @private
         */
        this._queryExecutor = new MysqlQueryExecutor(this._connectionDelegate);
        /**
         *
         * @type {MysqlQueryDataProvider}
         * @private
         */
        this._queryDataProvider = new MysqlQueryDataProvider();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderInsert = new MysqlInsertSQLBuilder();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderUpdate = new MysqlUpdateSQLBuilder();
        /**
         *
         * @type {DefinitionSQLBuilderInterface}
         * @private
         */
        this._builderDelete = new MysqlDeleteSQLBuilder();
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
        return this._queryExecutor.exec(sql, prepareValues).then(() => null);
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        this._queryExecutor.setDispatcher(dispatcher);
    }

    getConnection() {
        return this._connectionDelegate.getConnection();
    }
}
