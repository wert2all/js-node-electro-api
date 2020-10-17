import path from "path";
import ImageUrlProviderInterface from "../ImageUrlProviderInterface";

/**
 * @class ImageOriginalUrl
 * @extends ImageUrlProviderInterface
 * @type ImageUrlProviderInterface
 */
export default class ImageOriginalUrl extends ImageUrlProviderInterface {
    /**
     *
     * @param {KeyValueStorageInterface} keyValueStorageConfig
     * @param {DestinationPathProviderInterface} imageDestination
     */
    constructor(keyValueStorageConfig, imageDestination) {
        super();
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._keyValueStorage = keyValueStorageConfig;
        /**
         * @type {DestinationPathProviderInterface}
         */
        this._imageDestination = imageDestination;
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
        return this._makeAbsolutePath(this._makeRelativePath(path.normalize(fileData.getFilePath())));
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
        return imagePath.substr(this._imageDestination.getImageRootPath().length, imagePath.length);
    }

    /**
     *
     * @param {UserFilesEntity} imageEntity
     * @return {string}
     */
    provide(imageEntity) {
        return this._makeUrl(imageEntity);
    }
}
