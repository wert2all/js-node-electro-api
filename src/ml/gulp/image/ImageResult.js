import DataValue from "../../../lib/data-value/DataValue";

/**
 * @class ImageResult
 */
export default class ImageResult {
    constructor() {
        /**
         *
         * @type {DataValue}
         * @private
         */
        this._data = new DataValue();
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getResultValues() {
        return this._data.toHash();
    }
}
