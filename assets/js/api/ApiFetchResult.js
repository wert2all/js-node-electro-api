/**
 * @class ApiFetchResult
 */
export default class ApiFetchResult {
    /**
     *
     * @param {boolean} status
     * @param {string} errorMessage
     * @param {*}data
     */
    constructor(status, errorMessage = '', data = null) {
        /**
         *
         * @type {boolean}
         * @private
         */
        this._status = status;
        /**
         *
         * @type {string}
         * @private
         */
        this._errorMessage = errorMessage;
        /**
         *
         * @type {null|*}
         * @private
         */
        this._data = data;
    }

    /**
     *
     * @param {Error} error
     * @return {ApiFetchResult}
     */
    static createError(error) {
        return new ApiFetchResult(false, error.message);
    }

}
