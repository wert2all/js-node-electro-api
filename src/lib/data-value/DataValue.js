import DataValueInterface from './DataValueInterface';

/**
 * @class DataValue
 * @type DataValueInterface
 * @extends DataValueInterface
 */
export default class DataValue extends DataValueInterface {
    constructor() {
        super();
        /**
         *
         * @type {Object<string, string>}
         * @private
         */
        this._data = {};
    }

    /**
     * @param  {string} key
     * @return {string||null}
     */
    getData(key) {
        return this._data[key];
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    setData(key, value) {
        this._data[key] = value;
    }

    /**
     *
     * @return {Object<string,string>}
     */
    toHash() {
        return this._data;
    }
}
