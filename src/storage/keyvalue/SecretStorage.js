import FileKeyValueStorage from './FileKeyValueStorage';

/**
 * @class SecretStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 */
export default class SecretStorage extends FileKeyValueStorage {
    constructor(storageJsonFilePath) {
        super(storageJsonFilePath);
    }

    _defaultFetch() {
        throw Error('Error fetching secret key');
    }
}
