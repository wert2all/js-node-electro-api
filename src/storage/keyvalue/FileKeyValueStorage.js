import KeyValueStorageInterface from './KeyValueStorageInterface';
import ImplementationError from '../../lib/implementation-error/ImplementationError';

/**
 * @class FileKeyValueStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 * @abstract
 * @todo SOLID fix
 */
export default class FileKeyValueStorage extends KeyValueStorageInterface {
    /**
     *
     * @param {string} storageJsonFilePath
     */
    constructor(storageJsonFilePath) {
        super();
        /**
         *
         * @type {{}}
         * @protected
         */
        this._registry = {};
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isRead = false;
        /**
         *
         * @type {string}
         * @protected
         */
        this._storageFilePath = storageJsonFilePath;
    }

    /**
     *
     * @param {string} key
     * @return {*}
     */
    fetch(key) {
        this._read();
        if (this._registry.hasOwnProperty(key)) {
            return this._registry[key];
        }
        return this._defaultFetch();
    }

    /**
     *
     * @private
     */
    _read() {
        if (!this._isRead) {
            this._initRegistry();
            this._isRead = true;
        }
    }

    /**
     *
     * @protected
     */
    _initRegistry() {
        this._registry = this._readJson(this._storageFilePath);
    }

    /**
     * @abstract
     * @return {*}
     * @protected
     */
    _defaultFetch() {
        throw new ImplementationError(this, '_doError');
    }

    /**
     *
     * @param {string} filePath
     * @return {any}
     * @protected
     */
    _readJson(filePath) {
        return require(filePath);
    }
}
