import EntityInterface from "../../lib/db-entity/EntityInterface";
import DataValue from "../../lib/data-value/DataValue";
import UserDefinition from "../../db/definition/UserDefinition";

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
    }

    /**
     *
     * @param {GoogleAccount} googleAccount
     * @return {UserEntity}
     */
    setGoogleAccount(googleAccount) {
        this._data.setData(UserDefinition.COLUMN_GOOGLE_ID, googleAccount.getGoogleUserId());
        this._data.setData(UserDefinition.COLUMN_GOOGLE_NAME, googleAccount.getName());
        this._data.setData(UserDefinition.COLUMN_GOOGLE_EMAIL, googleAccount.getEmail());
        this._data.setData(UserDefinition.COLUMN_PHOTO_PATH, googleAccount.getPhoto());
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
     * @return {string}
     */
    getIsAdmin() {
        return this._data.getData(UserDefinition.COLUMN_IS_ADMIN);
    }

    /**
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    create(value) {
        const newObj = new UserEntity();
        Object.keys(value).map((key) => {
            newObj.setValue(key, value[key]);
        });
        return newObj;
    }

    /**
     * @param {string} key
     * @return {EntityInterface}
     */
    unset(key) {
        this._data.unset(key);
        return this;
    }
}
