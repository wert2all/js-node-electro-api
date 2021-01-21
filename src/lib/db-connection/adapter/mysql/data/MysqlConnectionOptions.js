export default class MysqlConnectionOptions {
    /**
     *
     * @param {string} host
     * @param {number} port
     * @param {string} database
     * @param {string} user
     * @param {string} password
     */
    constructor(host, port, database, user, password) {
        /**
         *
         * @type {string}
         * @private
         */
        this._host = host;
        /**
         *
         * @type {number}
         * @private
         */
        this._port = port;
        /**
         *
         * @type {string}
         * @private
         */
        this._database = database;
        /**
         *
         * @type {string}
         * @private
         */
        this._user = user;
        /**
         *
         * @type {string}
         * @private
         */
        this._password = password;
    }

    /**
     *
     * @return {string}
     */
    getPassword() {
        return this._password;
    }

    /**
     *
     * @return {string}
     */
    getUser() {
        return this._user;
    }

    /**
     *
     * @return {string}
     */
    getDatabase() {
        return this._database;
    }

    /**
     *
     * @return {number}
     */
    getPort() {
        return this._port;
    }

    /**
     *
     * @return {string}
     */
    getHost() {
        return this._host;
    }

    /**
     *
     * @return {{database: string, password: string, port: string, host: string, user: string}}
     */
    toHash() {
        return {
            host: this._host,
            port: this._port,
            database: this._database,
            user: this._user,
            password: this._password,
        };
    }
}
