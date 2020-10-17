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
     * @return {FileStorageConfig}
     */
    getStorageConfig() {
        return this._storageConfig;
    }
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
     * @param {ResizeConfig|null} size
     * @return string
     */
    provide(entity, size = null) {
        let fullPath = this._storageConfig.getStoragePath();
        if (size) {
            fullPath += size.getKey() + path.sep;
        }
        fullPath += entity.getFilePath().replace(/\/\//g, "/").replace(this._imageRootPath, "");
        const imagePathSplit = fullPath.split(path.sep);
        imagePathSplit.pop();
        return imagePathSplit.join(path.sep) + path.sep;
    }

    /**
     *
     * @return {string}
     */
    getImageRootPath() {
        return this._imageRootPath;
    }
}
