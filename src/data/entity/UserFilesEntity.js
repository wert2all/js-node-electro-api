import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserFilesDefinition from '../../db/definition/UserFilesDefinition';
import UserDefinition from '../../db/definition/UserDefinition';

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
        /**
         *
         * @type {null|ExtendedValuesEntity}
         * @private
         */
        this._extData = null;
    }

    static factory(imageId) {
        return new UserFilesEntity().setValue(UserFilesDefinition.COLUMN_ID, imageId);
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
     * @param {string} type
     * @return {UserFilesEntity}
     */
    setType(type) {
        this._data.setData(
            UserFilesDefinition.COLUMN_TYPE,
            type
        );
        return this;
    }

    /**
     *
     * @param {boolean} isReady
     * @return {UserFilesEntity}
     */
    setReady(isReady = true) {
        this._data.setData(
            UserFilesDefinition.COLUMN_IS_READY,
            isReady ? 'true' : 'false'
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

    /**
     * @param {Object<string,string>}value
     * @return EntityInterface
     */
    create(value) {
        const newObj = new UserFilesEntity();
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
     * @param {ExtendedValuesEntity} entity
     */
    setExtensionEntity(entity) {
        this._extData = entity;
    }

    /**
     *
     * @return {null|ExtendedValuesEntity}
     */
    getExtensionEntity() {
        return this._extData;
    }
}
