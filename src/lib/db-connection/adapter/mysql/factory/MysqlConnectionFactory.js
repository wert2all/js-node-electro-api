import ConnectionFactoryInterface from "../../../factory/ConnectionFactoryInterface";
import mysql from "mysql2";
import MysqlConnectionOptionsFactory from "./MysqlConnectionOptionsFactory";

export default class MysqlConnectionFactory extends ConnectionFactoryInterface {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._url = url;
        /**
         *
         * @type {MysqlConnectionOptionsFactory}
         * @private
         */
        this._connectionOptionsFactory = new MysqlConnectionOptionsFactory();
    }

    /**
     * @returns {Promise<Connection>}
     */
    factory() {
        /**
         *
         * @type {MysqlConnectionOptions}
         */
        const options = this._connectionOptionsFactory.create(this._url);
        const conn = mysql.createPool({
            host: options.getHost(),
            port: options.getPort(),
            database: options.getDatabase(),
            user: options.getUser(),
            password: options.getPassword(),
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        return new Promise((resolve) => resolve(conn));
    }
}
