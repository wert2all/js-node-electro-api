import sqlite3 from "sqlite3";
import ServerConfig from "../../server/ServerConfig";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";

export default class SQLiteConnectionFactory {
    /**
     *
     * @param {DI} di
     * @return {Promise<connection>}
     */
    static create(di) {
        const path =
            di.get(ServerConfig).getApplicationDirectory() +
            di.get(StorageConfiguration).getSecretStorage().fetch("db:sqlite:file:name");
        return new Promise((resolve, reject) => {
            const db = new sqlite3.cached.Database(path, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(db);
            });
        });
    }
}
