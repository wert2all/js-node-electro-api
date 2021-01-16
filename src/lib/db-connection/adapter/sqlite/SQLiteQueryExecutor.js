import EventSqlExec from "../../dispatcher/event/EventSqlExec";
import EventSqlError from "../../dispatcher/event/EventSqlError";

/**
 * @class SQLiteQueryExecutor
 */
export default class SQLiteQueryExecutor {
    constructor() {
        this._server = null;
        /**
         *
         * @type {null|DispatchInterface}
         * @private
         */
        this._dispatcher = null;
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     */
    setDispatcher(dispatcher) {
        this._dispatcher = dispatcher;
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
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<*>}
     */
    async exec(sql, whereData) {
        return new Promise((resolve, reject) => {
            if (this._dispatcher) {
                this._dispatcher.dispatch(new EventSqlExec(sql));
            }
            const stmt = this._server.prepare(sql, whereData);
            stmt.run(whereData, (err) => {
                if (err) {
                    if (this._dispatcher) {
                        this._dispatcher.dispatch(new EventSqlError(sql, err));
                    }
                    reject(err);
                } else {
                    resolve(stmt);
                }
            });
        });
    }

    /**
     *
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<Array>}
     */
    async fetch(sql, whereData) {
        return new Promise((resolve, reject) => {
            if (this._dispatcher) {
                this._dispatcher.dispatch(new EventSqlExec(sql));
            }
            const stmt = this._server.prepare(sql, whereData);
            stmt.all(whereData, (err, rows) => {
                if (err) {
                    if (this._dispatcher) {
                        this._dispatcher.dispatch(new EventSqlError(sql, err));
                    }
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}