import EntityInterface from "../../../lib/db-entity/EntityInterface";
import DataValue from "../../../lib/data-value/DataValue";

/**
 * @class MLLoggingEntity
 * @extends EntityInterface
 * @type EntityInterface
 */
export default class MLLoggingEntity extends EntityInterface {
    constructor() {
        super();
        /**
         *
         * @type {DataValueInterface}
         * @private
         */
        this._data = new DataValue();
    }

    /**
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    create(value) {
        const newObj = new MLLoggingEntity();
        Object.keys(value).map((key) => {
            newObj.setValue(key, value[key]);
        });
        return newObj;
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getData() {
        return this._data.toHash();
    }

    /**
     *
     * @param {string} key
     * @return {EntityInterface}
     */
    unset(key) {
        this._data.unset(key);
        return this;
    }

    /**
     *
     * @param {string} key
     * @return {string}
     */
    getValue(key) {
        return this._data.getData(key);
    }

    /**
     *
     * @param {string} key
     * @param {string} value
     * @return {EntityInterface}
     */
    setValue(key, value) {
        this._data.setData(key, value);
        return this;
    }
}
