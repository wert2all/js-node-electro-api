import ConnectionInterface from '../ConnectionInterface';
import SQLiteTableSQLBuilder from './builder/SQLiteTableSQLBuilder';
import SQLiteSelectSQLBuilder from './builder/SQLiteSelectSQLBuilder';
import SQLiteInsertSQLBuilder from './builder/SQLiteInsertSQLBuilder';
import SQLiteUpdateSQLBuilder from './builder/SQLiteUpdateSQLBuilder';

/**
 * @class SQLiteConnection
 * @type ConnectionInterface
 * @extends ConnectionInterface
 */
export default class SQLiteConnection extends ConnectionInterface {
    /**
     *
     * @param serverConnect
     */
    constructor(serverConnect = null) {
        super();
        /**
         * @param {*}
         * @private
         */
        this._server = serverConnect;
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
     * @param serverConnection
     */
    setServer(serverConnection) {
        this._server = serverConnection;
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {FilterInterface} filter
     * @return {Promise<Array>}
     */
    async select(definition, filter) {
        await this._createTable(definition, this._server);
        let data = {};
        filter.getFilterData().forEach(filter => {
            data[filter.field] = ' ' + filter.sign + ' :' + filter.field;
        });
        const sql = this._buiderSelect.buildSQL(definition, data);
        data = {};
        filter.getFilterData().map(filter => {
            data[filter.field] = filter.value;
        });
        return this._fetch(this._server, sql, this._buildQueryData(data));
    }

    /**
     *
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<string>}
     */
    // eslint-disable-next-line no-unused-vars
    async insert(definition, data) {
        await this._createTable(definition, this._server);
        const sql = this._builderInsert.buildSQL(definition, data);
        const prepareValues = this._buildQueryData(data);
        const insertData = await this._exec(this._server, sql, prepareValues);
        return Promise.resolve(insertData.lastID);
    }

    /**
     * @param {DefinitionTableInterface} definition
     * @param {Object<string, string>} data
     * @return {Promise<void>}
     */
    // eslint-disable-next-line no-unused-vars
    async update(definition, data) {
        await this._createTable(definition, this._server);
        const sql = this._builderUpdate.buildSQL(definition, data);
        const prepareValues = this._buildQueryData(data);
        delete (prepareValues[definition.getPrimaryColumn().getColumnName()]);
        // prepareValues[definition.getPrimaryColumn().getColumnName()] =
        //     data[definition.getPrimaryColumn().getColumnName()];
        console.log(prepareValues);
        return this._exec(this._server, sql, prepareValues);
    }

    /**
     *
     * @param {*} connection
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<Array>}
     * @private
     */
    async _fetch(connection, sql, whereData) {
        return new Promise((resolve, reject) => {
                console.info(sql);
                const stmt = connection.prepare(sql, whereData);
                stmt.all(whereData, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        );
    }

    /**
     *
     * @param {*} connection
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<*>}
     * @private
     */
    async _exec(connection, sql, whereData) {
        return new Promise((resolve, reject) => {
            console.info(sql);
            console.info(whereData);
            const stmt = connection.prepare(sql, whereData);
            stmt.run(whereData, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stmt);
                }
            });
        });
    }

    /**
     *
     * @return {Object<string, string>}
     * @private
     * @param {Object<string, string>}data
     */
    _buildQueryData(data) {
        const ret = {};
        Object.keys(data).forEach(key => {
            ret[':' + key] = data[key];
        });
        return ret;
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
        return this._exec(connection, tableSQl, []);
    }
}
