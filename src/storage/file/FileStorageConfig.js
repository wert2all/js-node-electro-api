import path from "path";

/**
 * @class FileStorageConfig
 *
 */
export default class FileStorageConfig {
    /**
     *
     * @param {string} storagePath
     * @param {string} tmpSubDirectory
     */
    constructor(storagePath, tmpSubDirectory = "tmp") {
        /**
         *
         * @type {string}
         * @private
         */
        this._storagePath = storagePath;
        /**
         *
         * @type {string}
         * @private
         */
        this._tmpPath = path.normalize(this._storagePath + path.sep + tmpSubDirectory + path.sep);
    }

    /**
     *
     * @return {string}
     */
    getTmpDirectory() {
        return this._tmpPath;
    }

    /**
     *
     * @return {string}
     */
    getStoragePath() {
        return this._storagePath;
    }
}
