/**
 * @class UserFilesEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
import EntityInterface from '../../lib/db-entity/EntityInterface';
import DataValue from '../../lib/data-value/DataValue';
import UserFilesDefinition from '../../db/definition/UserFilesDefinition';
import UserDefinition from '../../db/definition/UserDefinition';

export default class UserFilesEntity extends EntityInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserEntity||null}
         * @private
         */
        this._user = null;
        /**
         *
         * @type {YearMon||null}
         * @private
         */
        this._yearMon = null;
        /**
         *
         * @type {DataValueInterface}
         * @private
         */
        this._data = new DataValue();
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
        this._yearMon = yearMon;
        return this;
    }

    /**
     *
     * @return {Object<string, string>}
     */
    getData() {
        return this._data.toHash();
    }
}
