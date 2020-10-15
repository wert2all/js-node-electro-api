import DataValue from "../../../../data-value/DataValue";
import ImageResultInterface from "../ImageResultInterface";

/**
 * @class ImageResult
 * @extends ImageResultInterface
 * @type ImageResultInterface
 */
export default class ImageResult extends ImageResultInterface {
    static IS_ERROR = "ml_is_error";
    static ERROR_MESSAGE = "ml_error_message";

    constructor() {
        super();
        /**
         *
         * @type {DataValue}
         * @private
         */
        this._data = new DataValue();
        this._isError = false;
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getResultValues() {
        return this._data.toHash();
    }

    /**
     *
     * @param {Error} e
     */
    setError(e) {
        this._isError = true;
        this._setData(ImageResult.IS_ERROR, true)._setData(ImageResult.ERROR_MESSAGE, e.message);
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @return {ImageResult}
     * @private
     */
    _setData(key, value) {
        this._data.setData(key, value);
        return this;
    }

    /**
     *
     * @return {boolean}
     */
    getStatus() {
        return this._isError !== true;
    }
}
