import fs from "fs";

/**
 * @class DirectoryUtil
 */
export default class DirectoryUtil {
    /**
     *
     * @param {string} directory
     * @return {Promise<string>}
     */
    static create(directory) {
        return new Promise((resolve, reject) => {
            fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(directory);
            });
        });
    }
}
