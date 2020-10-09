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
     * @return {*}
     * @protected
     */
    _defaultFetch() {
        throw Error("Error fetching secret key");
    }
}
