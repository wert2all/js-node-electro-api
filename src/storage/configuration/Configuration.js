/**
 * @class Configuration
 */
export default class Configuration {
    /**
     *
     * @param {KeyValueStorageInterface} secretStorage
     * @param {KeyValueStorageInterface} configuration
     */
    constructor(secretStorage, configuration) {
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._secret = secretStorage;
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._configuration = configuration;
    }

    /**
     * @return {KeyValueStorageInterface}
     */
    getSecretStorage() {
        return this._secret;
    }

    /**
     *
     * @return {KeyValueStorageInterface}
     */
    getConfig() {
        return this._configuration;
    }
}
