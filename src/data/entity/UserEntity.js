/**
 * @class UserEntity
 *
 */
export default class UserEntity {
    constructor() {
        /**
         *
         * @type {string||null}
         */
        this.googleUserId = null;
    }

    /**
     *
     * @param {string} googleUserID
     * @return {UserEntity}
     */
    setGoogleUserId(googleUserID) {
        this.googleUserId = googleUserID;
        return this;
    }
}
