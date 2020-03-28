/**
 * @class StorageProvider
 */
export default class StorageProvider {
    /**
     *
     * @param {SecretStorage} secretStorage
     */
    constructor(secretStorage) {
        /**
         *
         * @type {SecretStorage}
         */
        this.secret = secretStorage;
    }

    /**
     *
     * @return {SecretStorage}
     */
    getSecretStorage() {
        return this.secret;
    }
}
