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
    get userId() {
        return this._userId;
    }

    /**
     *
     * @return {string}
     */
    get getUserEmail() {
        return this._userEmail;
    }

    /**
     *
     * @return {string}
     */
    get getUserName() {
        return this._userName;
    }

    /**
     *
     * @return {string}
     */
    get getUserImage() {
        return this._userImage;
    }
}
