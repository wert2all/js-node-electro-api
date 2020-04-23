import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserDefinition from '../../db/definition/UserDefinition';

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
         * @type {DataValueInterface}
         * @private
         */
        this._data = new DataValue();
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isLoaded = false;
    }

    /**
     *
     * @param {GoogleAccount} googleAccount
     * @return {UserEntity}
     */
    setGoogleAccount(googleAccount) {
        this._data.setData(
            UserDefinition.COLUMN_GOOGLE_ID,
            googleAccount.getGoogleUserId()
        );
        this._data.setData(UserDefinition.COLUMN_GOOGLE_NAME, googleAccount.getName());
        this._data.setData(UserDefinition.COLUMN_GOOGLE_EMAIL, googleAccount.getEmail());
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
        return this._data.getData(key);
    }

    /**
     * @return {boolean}
     */
    isLoaded() {
        return this._isLoaded;
    }

    /**
     * @return {EntityInterface}
     */
    setLoaded() {
        this._isLoaded = true;
        return this;
    }

    /**
     *
     * @return {EntityInterface}
     */
    setNoLoaded() {
        this._isLoaded = false;
        return this;
    }
}
