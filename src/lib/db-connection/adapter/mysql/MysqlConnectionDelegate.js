import { resolveConfigFile } from "prettier";
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
                    .catch((err) => {
                        console.log(err);
                        resolve(false);
                    });
            } else {
                resolve(false);
            }
        });
    }

    /**
     *
     * @return {Promise<*|null>}
     */
    getConnection() {
        return new Promise((resolve) => {
            this.ping()
                .then((isConnected) => {
                    if (isConnected) {
                        resolve(this._serverConnection);
                    } else {
                        this.getConnectionFactory()
                            .factory()
                            .then((connection) => {
                                this._serverConnection = connection;
                                resolve(this._serverConnection);
                            });
                    }
                })
                .catch((_) => resolve(this._serverConnection));
        });
    }
}
