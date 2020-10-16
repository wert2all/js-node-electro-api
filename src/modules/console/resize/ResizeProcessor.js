import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";
import DirectoryUtil from "../../../lib/filesystem/DirectoryUtil";
import * as path from "path";

/**
 * @class ResizeProcessor
 * @extends ProcessorInterface
 * @type ProcessorInterface
 */
export default class ResizeProcessor extends ProcessorInterface {
    /**
     *
     * @param {ResizeSizesHolder} sizes
     * @param {DestinationPathProviderInterface} destinationProvider
     */
    constructor(sizes, destinationProvider) {
        super();
        /**
         *
         * @type {ResizeSizesHolder}
         * @private
         */
        this._sizes = sizes;
        /**
         *
         * @type {DestinationPathProviderInterface}
         * @private
         */
        this._destinationProvider = destinationProvider;
    }

    /**
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResultInterface>} result
     */
    async processImage(entity, result) {
        return new Promise((resolve) => {
            const sizePromises = this._sizes.getSizes().map((size) => {
                return new Promise((resolve, reject) => {
                    this._createDirectory(entity, size)
                        .then((directory) => {
                            const imageName = this._getImageName(entity);
                            console.log(imageName);
                            resolve(true);
                        })
                        .catch(reject);
                });
            });
            Promise.all(sizePromises)
                .then(() => resolve(result))
                .catch((error) => {
                    console.error(error.message);
                    result.setError(error);
                    resolve(result);
                });
        });
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {SizeConfig} size
     * @return {Promise<string>}
     * @private
     */
    _createDirectory(entity, size) {
        return new Promise((resolve, reject) => {
            const destPath = this._destinationProvider.provide(entity, size);
            process.stdout.write("Creating directory " + destPath + " ...");
            DirectoryUtil.create(destPath)
                .then((directory) => {
                    process.stdout.write(" done\n");
                    resolve(directory);
                })
                .catch(reject);
        });
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {string}
     * @private
     */
    _getImageName(entity) {
        return entity.getFilePath().split(path.sep).pop();
    }
}
