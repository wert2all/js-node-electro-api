/**
 * @class UserFilesEntity
 * @type EntityInterface
 * @extends EntityInterface
 */
import EntityInterface from '../../lib/db-entity/EntityInterface';

export default class UserFilesEntity extends EntityInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserEntity||null}
         */
        this.user = null;
        /**
         *
         * @type {YearMon||null}
         */
        this.yearMon = null;
    }

    /**
     *
     * @param {UserEntity} userEntity
     * @return {UserFilesEntity}
     */
    setUser(userEntity) {
        this.user = userEntity;
        return this;
    }

    /**
     *
     * @param {YearMon} yearMon
     * @return {UserFilesEntity}
     */
    setYearMon(yearMon) {
        this.yearMon = yearMon;
        return this;
    }
}
