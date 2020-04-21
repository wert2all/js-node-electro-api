/**
 * @class StorageProvider
 */
export default class StorageProvider {
    /**
     *
     * @param {SecretStorage} secretStorage
     * @param {ConnectionInterface} connection
     */
    constructor(secretStorage, connection) {
        /**
         *
         * @type {SecretStorage}
         */
        this.secret = secretStorage;
        /**
         * @type {ConnectionInterface}
         */
        this.connection = connection;
    }

    /**
     *
     * @return {SecretStorage}
     */
    getSecretStorage() {
        return this.secret;
    }

    /**
     *
     * @return {ConnectionInterface}
     */
    getConnection() {
        return this.connection;
    }
}
