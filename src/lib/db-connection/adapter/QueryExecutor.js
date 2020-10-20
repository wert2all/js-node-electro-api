import SQLLogEvent from "../../../extended/logger/events/SQLLogEvent";

/**
 * @class QueryExecutor
 */
export default class QueryExecutor {
    /**
     *
     * @param {LoggerInterface} logger
     */
    constructor(logger) {
        /**
         *
         * @type {LoggerInterface}
         * @private
         */
        this._logger = logger;
        this._server = null;
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
            this._logger.info(new SQLLogEvent(sql));
            const stmt = this._server.prepare(sql, whereData);
            stmt.run(whereData, (err) => {
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
     * @param {string} sql
     * @param {Object<string,string>} whereData
     * @return {Promise<Array>}
     */
    async fetch(sql, whereData) {
        return new Promise((resolve, reject) => {
            this._logger.info(new SQLLogEvent(sql));
            const stmt = this._server.prepare(sql, whereData);
            stmt.all(whereData, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}
