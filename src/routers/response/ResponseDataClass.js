'use strict';
import DataValue from '../../lib/data-value/DataValue';

/**
 * @class ResponseDataClass
 *
 */
export default class ResponseDataClass {
    constructor() {
        /**
         *
         * @type {boolean}
         * @private
         */
        this._status = false;
        /**
         *
         * @type {string}
         * @private
         */
        this._message = '';
        /**
         *
         * @type {*}
         * @private
         */
        this._dump = null;
        /**
         *
         * @type {DataValue}
         * @private
         */
        this._data = new DataValue();
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @return {ResponseDataClass}
     */
    setData(key, value) {
        this._data.setData(key, value);
        return this;
    }

    toHash() {
        const ret = {
            status: this._status,
            message: this._message
        };
        if (this._dump) {
            ret.dump = this._dump;
        }
        ret.data = this._data.toHash();
        return ret;
    }

    /**
     *
     * @param {boolean} status
     * @return {ResponseDataClass}
     */
    setStatus(status) {
        this._status = status;
        return this;
    }

    /**
     *
     * @param {string} message
     * @return {ResponseDataClass}
     */
    setMessage(message) {
        this._message = message;
        return this;
    }

    /**
     *
     * @return {DataValueInterface}
     */
    getData() {
        return DataValue.create(this.toHash());
    }
}
