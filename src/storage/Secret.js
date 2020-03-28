/**
 * @class SecretStorage
 */
export default class SecretStorage {
    constructor(storageJsonFilePath) {
        /**
         *
         * @type {{}}
         */
        this.registry = {};
        this._isRead = false;
        this.jsonFilePath = storageJsonFilePath;
    }

    /**
     *
     * @param {string} key
     * @return {*}
     */
    fetch(key) {
        this._read();
        if (this.registry.hasOwnProperty(key)) {
            return this.registry[key];
        }
        throw Error('Error fetching secret key');
    }

    _read() {
        if (!this._isRead) {
            this._readJson();
            this._isRead = true;
        }
    }

    _readJson() {
        this.registry = require(this.jsonFilePath);
    }
}
