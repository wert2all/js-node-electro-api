import ResizeConfig from "../size/ResizeConfig";

/**
 * @class ImageData
 * @type ImageData
 */
export default class ImageData {
    constructor() {
        /**
         *
         * @type {string}
         * @private
         */
        this._directory = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._imagePath = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._imageName = "";
        /**
         *
         * @type {number}
         * @private
         */
        this._rotation = 0;
        /**
         *
         * @type {string}
         * @private
         */
        this._rotatedImagePath = "";

        /**
         *
         * @type {ResizeConfig}
         * @private
         */
        this._originalSize = new ResizeConfig("originalSize", 0, 0);
        /**
         *
         * @type {number}
         * @private
         */
        this._width = 0;
        /**
         *
         * @type {number}
         * @private
         */
        this._height = 0;
    }

    /**
     *
     * @return {ResizeConfig}
     */
    getOriginalSize() {
        return this._originalSize;
    }

    /**
     *
     * @param {ResizeConfig} size
     * @return {ImageData}
     */
    setOriginalSize(size) {
        this._originalSize = size;
        return this;
    }

    /**
     *
     * @return {number}
     */
    getHeight() {
        return this._height;
    }

    /**
     *
     * @param {number} height
     * @return {ImageData}
     */
    setHeight(height) {
        this._height = height;
        return this;
    }

    /**
     *
     * @return {number}
     */
    getWidth() {
        return this._width;
    }

    /**
     *
     * @param {number} width
     * @return {ImageData}
     */
    setWidth(width) {
        this._width = width;
        return this;
    }

    /**
     *
     * @return {string}
     */
    getRotatedImagePath() {
        return this._rotatedImagePath;
    }

    /**
     *
     * @param {string} path
     * @return {ImageData}
     */
    setRotatedImagePath(path) {
        this._rotatedImagePath = path;
        return this;
    }

    /**
     *
     * @param {number} angle
     * @return {ImageData}
     */
    setRotation(angle) {
        this._rotation = angle;
        return this;
    }

    /**
     *
     * @return {number|*}
     */
    getRotation() {
        return this._rotation;
    }

    /**
     *
     * @return {string}
     */
    getImageName() {
        return this._imageName;
    }

    /**
     *
     * @param {string} name
     * @return {ImageData}
     */
    setImageName(name) {
        this._imageName = name;
        return this;
    }

    /**
     *
     * @return {string}
     */
    getImagePath() {
        return this._imagePath;
    }

    /**
     *
     * @param {string} path
     * @return {ImageData}
     */
    setImagePath(path) {
        this._imagePath = path;
        return this;
    }

    /**
     *
     * @return {string}
     */
    getDirectory() {
        return this._directory;
    }

    /**
     *
     * @param {string} directory
     * @return {ImageData}
     */
    setDirectory(directory) {
        this._directory = directory;
        return this;
    }
}
