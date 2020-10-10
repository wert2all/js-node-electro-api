/**
 * @class ResponseResult
 */
export default class ResponseResult {
    static TYPE_JSON = "json";
    static TYPE_HTML = "html";

    /**
     *
     * @param {string} responseType
     * @param {DataValueInterface} responseData
     */
    constructor(responseType, responseData) {
        this._responseType = responseType;
        /**
         *
         * @type {DataValueInterface}
         * @private
         */
        this._responseData = responseData;
    }

    /**
     * @return {string}
     */
    getResultType() {
        return this._responseType;
    }

    /**
     *
     * @return {DataValueInterface}
     */
    getData() {
        return this._responseData;
    }
}
