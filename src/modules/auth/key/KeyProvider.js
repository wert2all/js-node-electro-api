/**
 * @class ApiKeyProvider
 */
export default class ApiKeyProvider {
    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {string} key
     */
    constructor(storageProvider, key = 'google:api:signin:key') {
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._secretStorage = storageProvider.getConfiguration().getSecretStorage();
        /**
         *
         * @type {string}
         * @private
         */
        this._key = key;
    }

    /**
     *
     * @return {string}
     */
    get() {
        return this._secretStorage.fetch(this._key);
    }
}
