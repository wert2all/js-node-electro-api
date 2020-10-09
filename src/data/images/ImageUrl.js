import path from "path";
import UserFilesDefinition from "../../db/definition/UserFilesDefinition";
import ImageProcessDirectoryProcessor from "../../storage/file/process/image/ImageProcessDirectoryProcessor";

/**
 * @class ImageUrl
 */
export default class ImageUrl {
    /**
     *
     * @param {KeyValueStorageInterface} keyValueStorageConfig
     * @param {FileStorageConfig} fileStorage
     */
    constructor(keyValueStorageConfig, fileStorage) {
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._keyValueStorage = keyValueStorageConfig;
        /**
         *
         * @type {FileStorageConfig}
         * @private
         */
        this._fileStorageConfig = fileStorage;
    }

    /**
     *
     * @param {UserFilesEntity} fileData
     * @return {string}
     */
    getUrl(fileData) {
        return this._makeUrl(fileData);
    }

    /**
     *
     * @param {UserFilesEntity} fileData
     * @private {string}
     */
    // eslint-disable-next-line no-unused-vars
    _makeUrl(fileData) {
        return this._makeAbsolutePath(
            this._makeRelativePath(path.normalize(fileData.getValue(UserFilesDefinition.COLUMN_PATH)))
        );
    }

    /**
     *
     * @param {string} relativePath
     * @returns {string}
     * @private
     */
    _makeAbsolutePath(relativePath) {
        return this._keyValueStorage.fetch("api:url:static:image") + relativePath;
    }

    /**
     *
     * @param {string} imagePath
     * @returns {string}
     * @private
     */
    _makeRelativePath(imagePath) {
        const rootPath = new ImageProcessDirectoryProcessor().getDirectoryRoot(this._fileStorageConfig);
        return imagePath.substr(rootPath.length, imagePath.length);
    }
}
