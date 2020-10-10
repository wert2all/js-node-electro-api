import FileKeyValueStorage from "./FileKeyValueStorage";

/**
 * @class ConfigStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 */
export default class ConfigStorage extends FileKeyValueStorage {
    /**
     *
     * @param {ReaderInterface} reader
     */
    constructor(reader) {
        super(reader);
    }

    /**
     *
     * @return {null}
     * @protected
     */
    _defaultFetch() {
        return null;
    }
}
