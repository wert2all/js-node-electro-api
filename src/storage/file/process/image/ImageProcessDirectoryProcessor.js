import path from 'path';
import fs from 'fs';
/**
 * @class ImageProcessDirectoryProcessor
 */
import YearMon from '../../../../data/YearMon';

export default class ImageProcessDirectoryProcessor {
    /**
     *
     * @param {FileStorageConfig} config
     * @return {Promise<string>}
     */
    create(config) {
        return new Promise((resolve, reject) => {
            const yearMon = new YearMon();
            const directory = config.getStoragePath() + path.sep
                + 'images' + path.sep
                + yearMon.getYear() + path.sep
                + yearMon.getMonth() + path.sep;
            fs.mkdir(directory, {recursive: true}, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(directory);
            });
        });
    }
}
