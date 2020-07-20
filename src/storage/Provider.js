/**
 * @class StorageProvider
 */
export default class StorageProvider {
    /**
     *
     * @param {FileStorage} fileStorage
     * @param {StorageConfiguration} configuration
     */
    constructor(configuration, fileStorage) {
        /**
         *
         * @type {FileStorage}
         * @private
         */
        this._fileStorage = fileStorage;

        /**
         *
         * @type {StorageConfiguration}
         * @private
         */
        this._configuration = configuration;
    }

    /**
     * @deprecated use getConfiguration()
     * @return {KeyValueStorageInterface}
     */
    getSecretStorage() {
        return this.getConfiguration().getSecretStorage();
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
     * @returns {StorageConfiguration}
     */
    getConfiguration() {
        return this._configuration;
    }
}
