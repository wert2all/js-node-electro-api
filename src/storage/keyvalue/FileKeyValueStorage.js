import KeyValueStorageInterface from "./KeyValueStorageInterface";
import ImplementationError from "../../lib/implementation-error/ImplementationError";

/**
 * @class FileKeyValueStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 * @abstract
 */
export default class FileKeyValueStorage extends KeyValueStorageInterface {
    /**
     *
     * @param {ReaderInterface} reader
     */
    constructor(reader) {
        super();
        /**
         *
         * @type {{}}
         * @protected
         */
        this._registry = {};
        /**
         *
         * @type {ReaderInterface}
         * @private
         */
        this._reader = reader;
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
     * @return {FileKeyValueStorage}
     * @private
     */
    _read() {
        this._registry = this._reader.read();
        return this;
    }

    /**
     * @abstract
     * @return {*}
     * @protected
     */
    _defaultFetch() {
        throw new ImplementationError(this, "_doError");
    }
}
