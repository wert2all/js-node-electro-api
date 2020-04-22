import fs from 'fs';
import FileProcessInterface from './FileProcessInterface';
import FileTypeImage from '../../../data/files/types/FileTypeImage';
import ErrorFileStorageProcessMove from '../error/ErrorFileStorageProcessMove';
import ImageProcessDirectoryProcessor from './image/ImageProcessDirectoryProcessor';

/**
 * @class ImageProcess
 * @type FileProcessInterface
 * @extends FileProcessInterface
 */
export default class ImageProcess extends FileProcessInterface {
    constructor() {
        super();
        /**
         *
         * @type {ImageProcessDirectoryProcessor}
         * @private
         */
        this._directoryProcessor = new ImageProcessDirectoryProcessor();
    }

    /**
     * @param {FileTypeInterface} type
     * @return {boolean}
     */
    checkType(type) {
        return (FileTypeImage.TYPE === type.getType());
    }

    setConfig(config) {
        /**
         *
         * @type {FileStorageConfig}
         * @private
         */
        this._config = config;
    }

    /**
     *
     * @param {FileData}fileData
     * @param {FileNameProviderInterface} fileNameProvider
     * @return {Promise<FileData>}
     */
    async process(fileData, fileNameProvider) {
        return new Promise((resolve, reject) => {
            this._directoryProcessor
                .create(this._config)
                .then(directory => {
                    const oldPath = fileData.getPath();
                    const newPath = directory + fileNameProvider.getName(fileData);
                    if (oldPath !== false) {
                        fs.rename(
                            fileData.getPath().toString(),
                            newPath,
                            err => {
                                if (err) {
                                    throw err;
                                }
                                fileData.setPath(newPath);
                                resolve(fileData);
                            });
                    } else {
                        throw new ErrorFileStorageProcessMove();
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
