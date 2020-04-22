import path from 'path';

/**
 * @class FileStorage
 */
export default class FileStorage {
    /**
     *
     * @param {string} storagePath
     * @param {string} tmpSubDirectory
     */
    constructor(storagePath, tmpSubDirectory = 'tmp') {
        /**
         *
         * @type {string}
         * @private
         */
        this._storagePath = storagePath;
        this._tmpPath = path.normalize(
            this._storagePath + path.sep + tmpSubDirectory + path.sep
        );
    }

    /**
     *
     * @return {string}
     */
    getTmpDirectory() {
        return this._tmpPath;
    }
}
