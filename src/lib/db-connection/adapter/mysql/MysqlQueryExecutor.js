import EventSqlExec from "../../dispatcher/event/EventSqlExec";
import EventSqlError from "../../dispatcher/event/EventSqlError";

/**
 * @class MysqlQueryExecutor
 */
export default class MysqlQueryExecutor {
    /**
     *
     * @param {ConnectionInterface} connection
     */
    constructor(connection) {
        /**
         *
         * @type {ConnectionInterface}
         * @private
         */
        this._connection = connection;
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
     * @param {string} sql
     * @param {[]} whereData
     * @return {Promise<*>}
     */
    async exec(sql, whereData) {
        const createError = (err) => {
            if (this._dispatcher) {
                this._dispatcher.dispatch(new EventSqlError(sql, err));
            }
            return new Error("SQL Error [ " + sql + "]: " + err.message);
        };
        return new Promise((resolve, reject) => {
            if (this._dispatcher) {
                this._dispatcher.dispatch(new EventSqlExec(sql));
            }
            this._connection
                .getConnection()
                .then((connection) => {
                    connection.execute(sql, whereData, (err, results) => {
                        if (err) {
                            reject(createError(err));
                        }
                        resolve(results);
                    });
                })
                .catch((err) => reject(createError(err)));
        });
    }

    /**
     *
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<Array>}
     */
    async fetch(sql, whereData) {
        return this.exec(sql, whereData);
    }
}
