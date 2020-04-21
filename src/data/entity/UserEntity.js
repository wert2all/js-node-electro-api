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
         * @type {string|null}
         * @private
         */
        this._googleUserId = null;
        /**
         *
         * @type {DataValue}
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
}
