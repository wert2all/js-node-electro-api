import FileKeyValueStorage from './FileKeyValueStorage';

/**
 * @class ConfigStorage
 * @extends KeyValueStorageInterface
 * @type KeyValueStorageInterface
 */
export default class ConfigStorage extends FileKeyValueStorage {
    /**
     *
     * @param {string} configDirectory
     */
    constructor(configDirectory) {
        super(configDirectory);
    }

    _initRegistry() {
        let defaultConfig = {};
        let extendedConfig = {};

        try {
            defaultConfig = this._readJson(this._storageFilePath + 'config.default.json');
            extendedConfig = this._readJson(this._storageFilePath + 'config.json');
        } catch (e) {

        }
        if (defaultConfig === null) {
            defaultConfig = {};
        }
        this._registry = Object.assign(defaultConfig, extendedConfig);
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
