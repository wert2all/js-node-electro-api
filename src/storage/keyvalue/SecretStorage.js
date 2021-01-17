import FileKeyValueStorage from "./FileKeyValueStorage";

/**
 * @class SecretStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 */
export default class SecretStorage extends FileKeyValueStorage {
    /**
     *
     * @param {ReaderInterface} reader
     */
    constructor(reader) {
        super(reader);
    }

    /**
     * @param {string} key
     * @return {*}
     * @protected
     */
    _defaultFetch(key) {
        throw Error("Error fetching secret key " + key);
    }
}
