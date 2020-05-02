/**
 * @class StringExt
 */
export default class StringExt {
    /**
     *
     * @param {string} value
     */
    constructor(value) {
        /**
         *
         * @type {string}
         * @private
         */
        this._string = (value) ? value : '';
    }

    /**
     *
     * @param {string} search
     * @param {string} replacement
     * @return {string}
     */
    replaceAll(search, replacement) {
        return this._string.replace(new RegExp(search, 'g'), replacement);
    }
}
