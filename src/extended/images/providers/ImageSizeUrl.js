import ImageUrlProviderInterface from "../ImageUrlProviderInterface";

/**
 * @class ImageSizeUrl
 * @extends ImageUrlProviderInterface
 * @type ImageUrlProviderInterface
 */
export default class ImageSizeUrl extends ImageUrlProviderInterface {
    /**
     *
     * @param {ResizeConfig} size
     * @param {KeyValueStorageInterface} fileStorage
     * @param {DestinationPathProviderInterface} imageDestination
     */
    constructor(size, fileStorage, imageDestination) {
        super();
        /**
         *
         * @type {ResizeConfig}
         * @private
         */
        this._size = size;
        /**
         * @type {DestinationPathProviderInterface}
         */
        this._imageDestination = imageDestination;
        /**
         *
         * @type {KeyValueStorageInterface}
         * @private
         */
        this._fileStorageConfig = fileStorage;
    }

    /**
     *
     * @param {UserFilesEntity} imageEntity
     * @return {string}
     */
    provide(imageEntity) {
        const imagePath = imageEntity.getFilePath();
        return (
            this._fileStorageConfig.fetch("api:url:static:image") +
            this._fileStorageConfig.fetch("gulp:path:images:resize:directory") +
            this._size.getKey() +
            "/" +
            imagePath.substr(this._imageDestination.getImageRootPath().length, imagePath.length)
        );
    }
}
