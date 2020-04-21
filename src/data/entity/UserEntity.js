import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserDefinition from '../../db/definition/UserDefinition';
import ImplementationError from '../../lib/implementation-error/ImplementationError';

/**
 * @class UserEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
export default class UserEntity extends EntityInterface {
    constructor() {
        super();
        /**
         *
         * @type {string|null}
         * @private
         */
        this._googleUserId = null;
        /**
         *
         * @type {DataValueInterface}
         * @private
         */
        this._data = new DataValue();
    }

    /**
     *
     * @param {string} googleUserID
     * @return {UserEntity}
     */
    setGoogleUserId(googleUserID) {
        this._googleUserId = googleUserID;
        this._data.setData(UserDefinition.COLUMN_GOOGLE_ID, googleUserID);
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
     *
     * @param {string} key
     * @return {string|null}
     */
    getValue(key) {
        throw this._data.getData(key);
    }
}
