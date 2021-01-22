import ProcessorInterface from "../../../lib/console/gulp/processor/ProcessorInterface";
import DirectoryUtil from "../../../lib/filesystem/DirectoryUtil";
import path from "path";
import ResizeConfig from "./size/ResizeConfig";
import ImagesValues from "../../../data/entity/ext/ImagesValues";
import ImageData from "./data/ImageData";
import gm from "gm";

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
                    .then((directory) => new ImageData().setDirectory(directory))
                    .then((imageData) => imageData.setImagePath(entity.getFilePath()))
                    .then((imageData) => imageData.setImageName(this._getImageName(entity)))
                    .then((imageData) => imageData.setRotation(this._getRotation(entity)))
                    .then((imageData) =>
                        imageData.setRotatedImagePath(
                            this._rotateDestinationProvider.provide(entity) + imageData.getImageName()
                        )
                    )
                    .then((imageData) => this._setImageSizes(imageData))
                    .then((imageData) => this._rotateDefault(imageData, size.getBackground()))
                    .then((imageData) => this._resize(imageData, size))
                    .then((imageData) => this._rotate(imageData, size.getBackground()))
                    .then(() => resolve(true))
                    .catch(reject);
            });
        });
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
     * @param {ImageData} imageData
     * @param background
     * @return {Promise<ImageData>}
     * @private
     */
    _rotateDefault(imageData, background) {
        process.stdout.write("    Rotation to default ...");
        return new Promise((resolve, reject) => {
            gm(imageData.getImagePath())
                .rotate(background, 0)
                .write(imageData.getRotatedImagePath(), (err) => {
                    if (err) {
                        reject(err);
                    }
                    imageData.setImagePath(imageData.getRotatedImagePath());
                    process.stdout.write(" done\n");
                    resolve(imageData);
                });
        });
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {ResizeConfig} size
     * @return {Promise<ImageData>}
     * @private
     */
    _resize(imageData, size) {
        process.stdout.write("    Resizing to " + size.getKey() + " ...");
        return new Promise((resolve, reject) => {
            const toFile = imageData.getDirectory() + imageData.getImageName();
            gm(imageData.getImagePath())
                .resize(size.getWidth(), size.getHeight())
                .write(toFile, (err) => {
                    if (err) {
                        reject(err);
                    }
                    imageData.setImagePath(toFile);
                    process.stdout.write(" done\n");
                    resolve(imageData);
                });
        });
    }

    /**
     *
     * @param {ImageData} imageData
     * @param {*} background
     * @return {Promise<ImageData>}
     * @private
     */
    _rotate(imageData, background) {
        process.stdout.write("    Rotation to " + imageData.getRotation() + " ...");
        return new Promise((resolve, reject) => {
            if (imageData.getRotation() !== 0) {
                gm(imageData.getImagePath())
                    .rotate(background, imageData.getRotation())
                    .toBuffer((err, buffer) => {
                        if (err) {
                            reject(err);
                        }
                        gm(buffer).write(imageData.getImagePath(), (err) => {
                            if (err) {
                                reject(err);
                            }
                            process.stdout.write(" done\n");
                            resolve(imageData);
                        });
                    });
            } else {
                process.stdout.write(" done\n");
                resolve(imageData);
            }
        });
    }

    /**
     *
     * @param {ImageData} imageData
     * @return {Promise<ImageData>}
     * @private
     */
    _setImageSizes(imageData) {
        process.stdout.write("    Getting image sizes " + imageData.getImageName() + " ...");
        return new Promise((resolve, reject) => {
            gm(imageData.getImagePath()).size((err, sizes) => {
                if (err) {
                    reject(err);
                }
                if (sizes) {
                    if (sizes.width && sizes.height) {
                        imageData.setOriginalSize(new ResizeConfig("originalSize", sizes.width, sizes.height));
                    }
                    process.stdout.write(" done\n");
                    resolve(imageData);
                } else {
                    reject("Null size");
                }
            });
        });
    }
}
