import ConnectionInterface from '../ConnectionInterface';
import SQLiteTableSQLBuilder from './builder/SQLiteTableSQLBuilder';
import SQLiteSelectSQLBuilder from './builder/SQLiteSelectSQLBuilder';
import SQLiteInsertSQLBuilder from './builder/SQLiteInsertSQLBuilder';
import SQLiteUpdateSQLBuilder from './builder/SQLiteUpdateSQLBuilder';

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

        /**
         *
         * @type {SQLiteTableSQLBuilder}
         * @private
         */
        this._builderCreateTable = new SQLiteTableSQLBuilder();
        /**
         *
         * @type {SQLiteSelectSQLBuilder}
         * @private
         */
        this._buiderSelect = new SQLiteSelectSQLBuilder();
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
        let data = {};
        filter.getFilterData().forEach(filter => {
            data[filter.field] = ' ' + filter.sign + ' ?';
        });
        const sql = this._buiderSelect.buildSQL(definition, data);
        data = {};
        filter.getFilterData().map(filter => {
            data[filter.field] = filter.value;
        });
        return this._query(connection, sql, this._buildQueryData(data));
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
        const sql = this._builderInsert.buildSQL(definition, data);
        return this._query(connection, sql, this._buildQueryData(data));
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    async update(definition, data) {
        const connection = await this._connect();
        await this._createTable(definition, connection);
        const sql = this._builderUpdate.buildSQL(definition, data);
        const prepareValues = this._buildQueryData(data);
        prepareValues.push(data[definition.getPrimaryColumn().getColumnName()]);
        return this._query(connection, sql, prepareValues);
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
     * @return {Array<string>}
     * @private
     * @param {Object<string, string>}data
     */
    _buildQueryData(data) {
        return Object.keys(data).map(key => data[key]);
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {*} connection
     * @return {Promise<void>}
     * @private
     */
    async _createTable(definition, connection) {
        const tableSQl = this._builderCreateTable.buildSQL(definition, null);
        return this._query(connection, tableSQl, []);
    }
}
