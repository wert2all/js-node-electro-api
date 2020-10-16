import path from "path";
import fs from "fs";
/**
 * @class ImageProcessDirectoryProcessor
 */
import YearMon from "../../../../data/YearMon";
import DirectoryUtil from "../../../../lib/filesystem/DirectoryUtil";

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
        return DirectoryUtil.create(this.getDirectoryName(config));
    }

    /**
     *
     * @param {FileStorageConfig} config
     * @returns {string}
     */
    getDirectoryName(config) {
        return path.normalize(
            this.getDirectoryRoot(config) + this._yearMon.getYear() + path.sep + this._yearMon.getMonth() + path.sep
        );
    }

    /**
     *
     * @param {FileStorageConfig} config
     * @returns {string}
     */
    getDirectoryRoot(config) {
        return path.normalize(config.getStoragePath() + path.sep + "images" + path.sep);
    }
}
