import EntityInterface from "../../../lib/db-entity/EntityInterface";
import DataValue from "../../../lib/data-value/DataValue";
import MLModelLoggingDefinition from "../../../db/definition/ml/MLModelLoggingDefinition";

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

    /**
     *
     * @param {string} alias
     * @return {MLLoggingEntity}
     */
    setModelAlias(alias) {
        this.setValue(MLModelLoggingDefinition.COLUMN_ML_ALIAS, alias);
        return this;
    }

    /**
     *
     * @param {number} entityId
     * @return {MLLoggingEntity}
     */
    setEntityId(entityId) {
        this.setValue(MLModelLoggingDefinition.COLUMN_ENTITY_ID, entityId);
        return this;
    }

    /**
     *
     * @param {boolean} status
     * @return {MLLoggingEntity}
     */
    setStatus(status) {
        this.setValue(MLModelLoggingDefinition.COLUMN_STATUS, status);
        return this;
    }

    /**
     *
     * @param message
     * @return {MLLoggingEntity}
     */
    setMessage(message) {
        this.setValue(MLModelLoggingDefinition.COLUMN_LOG_MESSAGE, message);
        return this;
    }
}
