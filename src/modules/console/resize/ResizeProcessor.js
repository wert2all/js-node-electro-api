import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";
import DirectoryUtil from "../../../lib/filesystem/DirectoryUtil";
import path from "path";
import SizeConfig from "./size/SizeConfig";

const sizeOf = require("image-size");
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
        return Promise.all(this._createPromises(entity))
            .then(() => result)
            .catch((error) => {
                console.error(error.message);
                result.setError(error);
                return result;
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

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {SizeConfig}
     * @private
     */
    async _getImageSize(entity) {
        return new Promise((resolve, reject) => {
            sizeOf(entity.getFilePath(), function (err, dimensions) {
                if (err) {
                    reject(err);
                }
                resolve(new SizeConfig("original", dimensions.width, dimensions.height));
            });
        });
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {Promise<boolean>[]}
     * @private
     */
    _createPromises(entity) {
        return this._sizes.getSizes().map((size) => {
            return new Promise((resolve, reject) => {
                this._createDirectory(entity, size)
                    .then((directory) => this._addImageData("directory", directory, {}))
                    .then((imageData) => this._addImageData("imagename", this._getImageName(entity), imageData))
                    .then((imageData) =>
                        this._getImageSize(entity).then((dimensions) =>
                            this._addImageData("originalSize", dimensions, imageData)
                        )
                    )
                    .then((imageData) => {
                        console.log(imageData);
                        resolve(true);
                    })
                    .catch(reject);
            });
        });
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @param {*} imageData
     * @return {*}
     * @private
     */
    _addImageData(key, value, imageData) {
        imageData[key] = value;
        return imageData;
    }
}
