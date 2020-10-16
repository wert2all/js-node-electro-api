/**
 * @class SizeConfig
 */
export default class SizeConfig {
    /**
     *
     * @param {string} key
     * @param {number} width
     * @param {number} height
     */
    constructor(key, width, height) {
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
