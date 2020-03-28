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
         * @type {SecretStorage}
         */
        this.secretStorage = storageProvider.getSecretStorage();
    }

    /**
     *
     * @return {string}
     */
    get() {
        return this.secretStorage.fetch('google:api:signin:key');
    }
}
