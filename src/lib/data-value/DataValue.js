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
        return this;
    }

    /**
     *
     * @return {Object<string,string>}
     */
    toHash() {
        return this._data;
    }

    /**
     *
     * @param {*} hash
     * @return {DataValue}
     */
    static create(hash) {
        return Object.keys(hash)
            .reduce((prev, key) =>
                prev.setData(key, hash[key]), new DataValue());
    }
}
