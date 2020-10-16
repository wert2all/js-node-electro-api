/**
 * @class ResizeConfig
 */
export default class ResizeConfig {
    /**
     *
     * @param {string} key
     * @param {number} width
     * @param {number} height
     * @param {string} fill
     * @param {{r: number, b: number, g: number, alpha: number}} background
     */
    constructor(key, width, height, fill = "inside", background = { r: 0, g: 0, b: 0, alpha: 1 }) {
        /**
         *
         * @type {{r: number, b: number, g: number, alpha: number}}
         * @private
         */
        this._background = background;
        /**
         *
         * @type {string}
         * @private
         */
        this._key = key;
        /**
         *
         * @type {number}
         * @private
         */
        this._width = width;
        /**
         *
         * @type {number}
         * @private
         */
        this._height = height;
        /**
         *
         * @type {string}
         * @private
         */
        this._fill = fill;
    }

    /**
     *
     * @return {{r: number, b: number, g: number, alpha: number}}
     */
    getBackground() {
        return this._background;
    }

    /**
     *
     * @return {string}
     */
    getFill() {
        return this._fill;
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
     * @return {number}
     */
    getHeight() {
        return this._height;
    }

    /**
     *
     * @return {string}
     */
    getKey() {
        return this._key;
    }
}
