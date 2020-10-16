import FileStorageConfig from "../../../../storage/file/FileStorageConfig";
import DI from "../../../../lib/di/DI";
import FileStorage from "../../../../storage/FileStorage";
import KeyValueStorageInterface from "../../../../storage/keyvalue/KeyValueStorageInterface";
import ResizeDestinationPathProvider from "./ResizeDestinationPathProvider";

export default class ResizeDestinationPathProviderFactory {
    factory() {
        /**
         *
         * @type {DI}
         */
        const di = DI.getInstance();
        return new ResizeDestinationPathProvider(
            this._getImageRootPath(di),
            new FileStorageConfig(this._getResizedPath(di))
        );
    }

    /**
     * @param {DI} di
     * @return {string}
     * @private
     */
    _getResizedPath(di) {
        return (
            di.get(FileStorage).getConfig().getStoragePath() +
            di.get(KeyValueStorageInterface).fetch("gulp:path:images:resize:directory")
        );
    }

    /**
     *
     * @param {DI} di
     * @return {string}
     * @private
     */
    _getImageRootPath(di) {
        return (
            di.get(FileStorage).getConfig().getStoragePath() +
            di.get(KeyValueStorageInterface).fetch("server:images:subdirectory")
        );
    }
}
