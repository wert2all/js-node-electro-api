import ConnectionFactoryInterface from "../../../factory/ConnectionFactoryInterface";
import mysql from "mysql2/promise";

export default class MysqlConnectionFactory extends ConnectionFactoryInterface {
    /**
     *
     * @param {KeyValueStorageInterface} secretStorage
     * @param {string} key
     */
    constructor(secretStorage, key) {
        super();
        /**
         * @type {KeyValueStorageInterface}
         */
        this._secretSorage = secretStorage;
        /**
         * @type {string}
         */
        this._key = key;
    }

    /**
     * @returns {Promise}
     */
    factory() {
        return mysql.createConnection(this._secretSorage.fetch(this._key));
    }
}
