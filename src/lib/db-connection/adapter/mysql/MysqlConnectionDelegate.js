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
         * @type {null|*}
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
        return new Promise((resolve) => resolve(false));
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
