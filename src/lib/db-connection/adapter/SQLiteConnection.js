import ConnectionInterface from '../ConnectionInterface';
import SQLiteTableSQLFactory from './SQLiteTableSQLFactory';
import ImplementationError from '../../implementation-error/ImplementationError';

const sqlite3 = require('sqlite3').verbose();

/**
 * @class SQLiteConnection
 * @type ConnectionInterface
 * @extends ConnectionInterface
 */
export default class SQLiteConnection extends ConnectionInterface {
    /**
     *
     * @param {string} connectionURI
     */
    constructor(connectionURI) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._connectionURI = connectionURI;
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {Promise<Array>}
     */
    async select(definition, filter) {
        const connection = await this._connect();
        await this._createTable(definition, connection);
        const sql = this._buildSelect(definition, filter);
        return this._query(connection, sql, this._buildWhereData(filter));
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<string>}
     */
    // eslint-disable-next-line no-unused-vars
    async insert(definition, data) {
        const connection = await this._connect();
        await this._createTable(definition, connection);
        const sql = this._buildInsert(definition, data);
        return this._query(connection, sql, this._buildInsertData(data));
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {string}
     * @private
     */
    _buildSelect(definition, filter) {
        const whereCond = filter.getFilterData()
            .map(filterData => filterData.field + filterData.sign + '?');
        return 'Select * from '
            + definition.getTableName()
            + this._buildWhere(whereCond)
            + this._buildOrder()
            + this._buildLimit();
    }

    /**
     *
     * @param {*} connection
     * @param {string} sql
     * @param {Array<string>} whereData
     * @return {Promise<Array>}
     * @private
     */
    async _query(connection, sql, whereData) {
        return new Promise((resolve, reject) => {
            console.info(sql);
            connection.all(sql, whereData, (err, rows) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     *
     * @return {Promise<*>}
     * @private
     */
    async _connect() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this._connectionURI, err => {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(db);
            });
        });
    }

    /**
     *
     * @param {Array<string>} whereCond
     * @return {string}
     * @private
     */
    _buildWhere(whereCond) {
        return whereCond.length > 0 ? ' where ' + whereCond.join(' and ') : '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildOrder() {
        //TODO
        return '';
    }

    /**
     *
     * @return {string}
     * @private
     */
    _buildLimit() {
        //TODO
        return ' ';
    }

    /**
     *
     * @param {FilterInterface} filter
     * @return {Array<string>}
     * @private
     */
    _buildWhereData(filter) {
        return filter.getFilterData().map(filterData => filterData.value);
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {*} connection
     * @return {Promise<void>}
     * @private
     */
    async _createTable(definition, connection) {
        const tableSQl = this._createTableFactory().createSQL(definition);
        return this._query(connection, tableSQl, []);
    }

    /**
     * @return DefinitionTableSQLFactoryInterface
     * @private
     */
    _createTableFactory() {
        return new SQLiteTableSQLFactory();
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {string}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _buildInsert(definition, data) {
        throw new ImplementationError(this, '_buildInsert');
    }

    /**
     *
     *@param {Object<string, string>} data
     * @return {Array<string>}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    _buildInsertData(data) {
        throw new ImplementationError(this, '_buildInsertData');
    }
}
