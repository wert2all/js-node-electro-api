import ConnectionInterface from "../../ConnectionInterface";

/**
 * @class MysqlConnectionDelegate
 */
export default class MysqlConnectionDelegate extends ConnectionInterface {
    /**
     *
     * @param {ConnectionFactoryInterface} connectionFactory
     */
    constructor(connectionFactory) {
        super();
        /**
         *
         * @type {ConnectionFactoryInterface}
         */
        this._connectionFactory = connectionFactory;
        /**
         *
         * @type {null|import('mysql2/promise').Connection}
         * @private
         */
        this._serverConnection = null;
    }

    /**
     *
     * @return {ConnectionFactoryInterface}
     */
    getConnectionFactory() {
        return this._connectionFactory;
    }

    ping() {
        return new Promise((resolve) => {
            if (this._serverConnection !== null) {
                this._serverConnection
                    .ping()
                    .then(() => resolve(true))
                    .catch((_) => resolve(false));
            }
            resolve(false);
        });
    }

    /**
     *
     * @return {Promise<bool>}
     */
    getConnection() {
        return this.ping().then((isConnected) => {
            if (isConnected) {
                return this._serverConnection;
            } else {
                return this.getConnectionFactory()
                    .factory()
                    .then((connection) => {
                        this._serverConnection = connection;
                        return connection;
                    });
            }
        });
    }
}
