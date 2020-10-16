import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";
import DirectoryUtil from "../../../lib/filesystem/DirectoryUtil";
import path from "path";
import ResizeConfig from "./size/ResizeConfig";
import ImagesValues from "../../../data/entity/ext/ImagesValues";
import sharp from "sharp";

/**
 * @class ResizeProcessor
 * @extends ProcessorInterface
 * @type ProcessorInterface
 */
export default class ResizeProcessor extends ProcessorInterface {
    /**
     *
     * @param {ResizeSizesHolder} sizes
     * @param {DestinationPathProviderInterface} rotateDestinationProvider
     * @param {DestinationPathProviderInterface} destinationProvider
     */
    constructor(sizes, rotateDestinationProvider, destinationProvider) {
        super();
        /**
         *
         * @type {DestinationPathProviderInterface}
         * @private
         */
        this._rotateDestinationProvider = rotateDestinationProvider;
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
        this._resizedDestinationProvider = destinationProvider;
    }

    /**
     * @param {UserFilesEntity} entity
     * @param {ImageResultInterface} result
     * @return {Promise<ImageResultInterface>} result
     */
    async processImage(entity, result) {
        process.stdout.write("Processing " + this._getImageName(entity) + ":\n");
        return Promise.all(this._createPromises(entity))
            .then(() => result)
            .catch((error) => {
                console.log("\n");
                console.error(error);
                result.setError(error);
                return result;
            });
    }

    /**
     *
     * @param {UserFilesEntity} entity
     * @param {ResizeConfig} size
     * @return {Promise<string>}
     * @private
     */
    _createDirectory(entity, size) {
        return new Promise((resolve, reject) => {
            const destPath = this._resizedDestinationProvider.provide(entity, size);
            process.stdout.write("    Creating directory " + destPath + " ...");
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
     * @return {Promise<string>}
     * @private
     */
    _createRotateDirectory(entity) {
        return new Promise((resolve, reject) => {
            const destPath = this._rotateDestinationProvider.provide(entity);
            process.stdout.write("    Creating directory " + destPath + " ...");
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
     * @return {Promise<boolean>[]}
     * @private
     */
    _createPromises(entity) {
        return this._sizes.getSizes().map((size) => {
            return new Promise((resolve, reject) => {
                this._createDirectory(entity, size)
                    .then((directory) => this._createRotateDirectory(entity).then(() => directory))
                    .then((directory) => this._addImageData("directory", directory, {}))
                    .then((imageData) => this._addImageData("imagePath", entity.getFilePath(), imageData))
                    .then((imageData) => this._addImageData("imageName", this._getImageName(entity), imageData))
                    .then((imageData) => this._addImageData("rotation", this._getRotation(entity), imageData))
                    .then((imageData) =>
                        this._addImageData(
                            "rotatedImagePath",
                            this._rotateDestinationProvider.provide(entity) + imageData.imageName,
                            imageData
                        )
                    )
                    .then((imageData) => this._rotateDefault(imageData))
                    .then((imageData) => this._resize(imageData, size))
                    .then((imageData) => this._rotate(imageData))
                    .then(() => resolve(true))
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

    /**
     *
     * @param {UserFilesEntity} entity
     * @return {number}
     * @private
     */
    _getRotation(entity) {
        if (entity.getExtensionEntity()) {
            const rotation = parseInt(entity.getExtensionEntity().getValue(ImagesValues.ROTATION), 10);
            if (Number.isInteger(rotation)) {
                return rotation;
            }
        }
        return 0;
    }

    /**
     *
     * @param {*} imageData
     * @return {Promise<*>}
     * @private
     */
    _rotateDefault(imageData) {
        process.stdout.write("    Rotation to default ...");
        return new Promise((resolve, reject) => {
            sharp(imageData.imagePath)
                .rotate()
                .toFile(imageData.rotatedImagePath, (err, info) => {
                    if (err) {
                        reject(err);
                    }
                    imageData["imagePath"] = imageData.rotatedImagePath;
                    imageData["originalSize"] = new ResizeConfig("originalSize", info.width, info.height);
                    process.stdout.write(" done\n");
                    resolve(imageData);
                });
        });
    }

    /**
     *
     * @param {*} imageData
     * @param {ResizeConfig} size
     * @return {Promise<*>}
     * @private
     */
    _resize(imageData, size) {
        process.stdout.write("    Resizing to " + size.getKey() + " ...");
        return new Promise((resolve, reject) => {
            const toFile = imageData.directory + imageData.imageName;
            sharp(imageData.imagePath)
                .resize({
                    width: size.getWidth(),
                    height: size.getHeight(),
                    fit: size.getFill(),
                    background: size.getBackground(),
                })
                .toFile(toFile, (err) => {
                    if (err) {
                        reject(err);
                    }
                    imageData["imagePath"] = toFile;
                    process.stdout.write(" done\n");
                    resolve(imageData);
                });
        });
    }

    /**
     *
     * @param {*} imageData
     * @return {Promise<*>}
     * @private
     */
    _rotate(imageData) {
        process.stdout.write("    Rotation to " + imageData.rotation + " ...");
        return new Promise((resolve, reject) => {
            if (imageData.rotation !== 0) {
                sharp(imageData.imagePath)
                    .rotate(imageData.rotation)
                    .toBuffer()
                    .then((buffer) => {
                        sharp(buffer).toFile(imageData.imagePath, (err) => {
                            if (err) {
                                reject(err);
                            }
                            process.stdout.write(" done\n");
                            resolve(imageData);
                        });
                    })
                    .catch(reject);
            } else {
                process.stdout.write(" done\n");
                resolve(imageData);
            }
        });
    }
}
