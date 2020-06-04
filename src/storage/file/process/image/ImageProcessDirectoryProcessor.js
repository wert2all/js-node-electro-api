import path from 'path';
import fs from 'fs';
/**
 * @class ImageProcessDirectoryProcessor
 */
import YearMon from '../../../../data/YearMon';

export default class ImageProcessDirectoryProcessor {
    /**
     *
     * @param {YearMon} yearMon
     */
    constructor(yearMon = null) {
        /**
         * @type {YearMon}
         * @private
         */
        this._yearMon = yearMon != null ? yearMon : new YearMon();
    }

    /**
     *
     * @param {FileStorageConfig} config
     * @return {Promise<string>}
     */
    create(config) {
        return new Promise((resolve, reject) => {
            const directory = this.getDirectoryName(config);
            fs.mkdir(directory, {recursive: true}, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(directory);
            });
        });
    }

    /**
     *
     * @param {FileStorageConfig} config
     * @returns {string}
     */
    getDirectoryName(config) {
        return path.normalize(
            this.getDirectoryRoot(config)
            + this._yearMon.getYear() + path.sep
            + this._yearMon.getMonth() + path.sep
        );
    }

    /**
     *
     * @param {FileStorageConfig} config
     * @returns {string}
     */
    getDirectoryRoot(config) {
        return path.normalize(config.getStoragePath() + path.sep + 'images' + path.sep);
    }
}
