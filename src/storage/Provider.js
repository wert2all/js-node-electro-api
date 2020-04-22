/**
 * @class StorageProvider
 */
export default class StorageProvider {
    /**
     *
     * @param {SecretStorage} secretStorage
     * @param {FileStorage} fileStorage
     * @param {ConnectionInterface} connection
     */
    constructor(secretStorage, fileStorage, connection) {
        /**
         *
         * @type {SecretStorage}
         * @private
         */
        this._secret = secretStorage;
        /**
         * @type {ConnectionInterface}
         * @private
         */
        this._connection = connection;
        /**
         *
         * @type {FileStorage}
         * @private
         */
        this._fileStorage = fileStorage;
    }

    /**
     *
     * @return {SecretStorage}
     */
    getSecretStorage() {
        return this._secret;
    }

    /**
     *
     * @return {ConnectionInterface}
     */
    getConnection() {
        return this._connection;
    }

    /**
     *
     * @return {FileStorage}
     */
    getFileStorage() {
        return this._fileStorage;
    }
}
