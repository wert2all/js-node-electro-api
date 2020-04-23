import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserFilesDefinition from '../../db/definition/UserFilesDefinition';
import UserDefinition from '../../db/definition/UserDefinition';
import ImplementationError from '../../lib/implementation-error/ImplementationError';

/**
 * @class UserFilesEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
export default class UserFilesEntity extends EntityInterface {
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
     * @return {UserFilesEntity}
     */
    setUser(userEntity) {
        this._user = userEntity;
        this._data.setData(
            UserFilesDefinition.COLUMN_GOOGLE_USER_ID,
            userEntity.getValue(UserDefinition.COLUMN_GOOGLE_ID)
        );
        return this;
    }

    /**
     *
     * @param {YearMon} yearMon
     * @return {UserFilesEntity}
     */
    setYearMon(yearMon) {
        this._data.setData(
            UserFilesDefinition.COLUMN_YEARMON,
            yearMon.toString()
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
     * @return {UserEntity|null}
     */
    getUser() {
        return this._user;
    }

    /**
     *
     * @param path
     * @return {UserFilesEntity}
     */
    setFilePath(path) {
        this._data.setData(
            UserFilesDefinition.COLUMN_PATH,
            path
        );
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
