import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';

/**
 * @class ExtendedValuesEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
export default class ExtendedValuesEntity extends EntityInterface {
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
     *
     * @param {string} key
     * @param {string} value
     * @return {EntityInterface}
     */
    setValue(key, value) {
        this._data.setData(key, value);
        return this;
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getData() {
        return this._data.toHash();
    }

    /**
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    create(value) {
        const newObj = new ExtendedValuesEntity();
        Object.keys(value).map(key => {
            newObj.setValue(key, value[key]);
        });
        return newObj;
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
}
