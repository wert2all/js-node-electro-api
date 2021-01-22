/**
 * @class ResizeConfig
 */
export default class ResizeConfig {
    /**
     *
     * @param {string} key
     * @param {number} width
     * @param {number} height
     * @param {*} background
     */
    constructor(key, width, height, background = "") {
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
    }

    /**
     *
     * @return {*}
     */
    getBackground() {
        return this._background;
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
