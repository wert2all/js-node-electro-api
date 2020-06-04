/**
 * @class ApiKeyProvider
 */
export default class ApiKeyProvider {
    /**
     *
     * @param {StorageProvider} storageProvider
     */
    constructor(storageProvider) {
        /**
         *
         * @type {KeyValueStorageInterface}
         */
        this.secretStorage = storageProvider.getConfiguration().getSecretStorage();
    }

    /**
     *
     * @return {string}
     */
    get() {
        return this.secretStorage.fetch('google:api:signin:key');
    }
}
