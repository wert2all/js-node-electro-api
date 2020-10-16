import DestinationPathProviderInterface from "./DestinationPathProviderInterface";
import FileStorageConfig from "../../../../storage/file/FileStorageConfig";
import * as path from "path";

/**
 * @class ResizeDestinationPathProvider
 * @extends DestinationPathProviderInterface
 * @type DestinationPathProviderInterface
 */
export default class ResizeDestinationPathProvider extends DestinationPathProviderInterface {
    /**
     *
     * @param {string} imageRootPath
     * @param {FileStorageConfig} storageConfig
     */
    constructor(imageRootPath, storageConfig) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._imageRootPath = imageRootPath;
        /**
         *
         * @type {FileStorageConfig}
         * @private
         */
        this._storageConfig = storageConfig;
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {SizeConfig} size
     * @return string
     */
    provide(entity, size) {
        const imagePathSplit = (
            this._storageConfig.getStoragePath() +
            size.getKey() +
            path.sep +
            entity.getFilePath().replace(/\/\//g, "/").replace(this._imageRootPath, "")
        ).split(path.sep);
        imagePathSplit.pop();
        return imagePathSplit.join(path.sep) + path.sep;
    }
}
