/**
 * @class StorageProvider
 */
export default class StorageProvider {
    /**
     *
     * @param {FileStorage} fileStorage
     * @param {ConnectionInterface} connection
     * @param {Configuration} configuration
     */
    constructor(configuration, fileStorage, connection) {
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

        /**
         *
         * @type {Configuration}
         * @private
         */
        this._configuration = configuration;
    }

    /**
     * @deprecated use getConfiguration()
     * @return {SecretStorage}
     */
    getSecretStorage() {
        return this.getConfiguration().getSecretStorage();
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

    /**
     *
     * @returns {Configuration}
     */
    getConfiguration() {
        return this._configuration;
    }
}
