import DI from '../../../lib/di/DI';
import StorageConfiguration from '../../../storage/configuration/StorageConfiguration';

/**
 * @class ApiKeyProvider
 */
export default class ApiKeyProvider {
    static DEFAULT_KEY = 'google:api:signin:key';

    /**
     *
     * @param {KeyValueStorageInterface} secretStorage
     * @param {string} key
     */
    constructor(secretStorage, key = ApiKeyProvider.DEFAULT_KEY) {
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._secretStorage = secretStorage;
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
    static getDefault() {
        return new ApiKeyProvider(DI.getInstance()
            .get(StorageConfiguration)
            .getSecretStorage())
            .get();
    }

    /**
     *
     * @return {string}
     */
    get() {
        return this._secretStorage.fetch(this._key);
    }
}
