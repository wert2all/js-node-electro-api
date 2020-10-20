import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import mysql from "mysql2/promise";

/**
 * @class MysqlConnectionFactory
 */
export default class MysqlConnectionFactory {
    /**
     *
     * @param {DI} di
     * @return {Promise<{read:*, write:*}>}
     */
    static create(di) {
        /**
         *
         * @type {KeyValueStorageInterface}
         */
        const secretStorage = di.get(StorageConfiguration).getSecretStorage();
        const returnConnections = {
            read: null,
            write: null,
        };
        return mysql
            .createConnection(secretStorage.fetch("db:mysql:url:read"))
            .then((connection) => {
                returnConnections.read = connection;
                return mysql.createConnection(secretStorage.fetch("db:mysql:url:write"));
            })
            .then((connection) => {
                returnConnections.write = connection;
                return returnConnections;
            });
    }
}
