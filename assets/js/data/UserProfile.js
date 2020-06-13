/**
 * @class UserProfile
 */
export default class UserProfile {
    /**
     *
     * @param {string} userId
     * @param {string} userName
     * @param {string} userEmail
     * @param {string} userImage
     */
    constructor(userId, userName, userEmail, userImage) {
        /**
         *
         * @type {string}
         * @private
         */
        this._userName = userName;
        /**
         *
         * @type {string}
         * @private
         */
        this._userEmail = userEmail;
        /**
         *
         * @type {string}
         * @private
         */
        this._userImage = userImage;
        /**
         *
         * @type {string}
         * @private
         */
        this._userId = userId;
    }

    /**
     *
     * @return {string}
     */
    getUserId() {
        return this._userId;
    }

    /**
     *
     * @return {string}
     */
    getUserEmail() {
        return this._userEmail;
    }

    /**
     *
     * @return {string}
     */
    getUserName() {
        return this._userName;
    }

    /**
     *
     * @return {string}
     */
    getUserImage() {
        return this._userImage;
    }
}
