import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserDefinition from '../../db/definition/UserDefinition';
import UserProfileDefinition from '../../db/definition/UserProfileDefinition';
import UserEntity from './UserEntity';

/**
 * @class UserProfileEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
export default class UserProfileEntity extends EntityInterface {
    /**
     *
     */
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
         * @type {UserEntity|null}
         * @private
         */
        this._user = null;
    }

    /**
     *
     * @param {UserEntity} userEntity
     * @return {UserProfileEntity}
     */
    setUser(userEntity) {
        this._user = userEntity;
        this._data.setData(
            UserProfileDefinition.COLUMN_GOOGLE_USER_ID,
            userEntity.getValue(UserDefinition.COLUMN_GOOGLE_ID)
        );
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
     * @return {UserEntity}
     */
    getUser() {
        return this._user;
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
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    create(value) {
        const newObj = new UserProfileEntity();
        Object.keys(value).map(key => {
            newObj.setValue(key, value[key]);
        });
        return newObj;
    }
}
