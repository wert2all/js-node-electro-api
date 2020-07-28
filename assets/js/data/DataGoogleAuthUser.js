export default class DataGoogleAuthUser {
    /**
     *
     * @param {string} userId
     * @param {string} userName
     * @param {string} userEmail
     * @param {string|null} userImage
     * @param {string} token
     */
    constructor(userId, userName, userEmail, userImage = null, token = '') {
        /**
         *
         * @type {string}
         * @private
         */
        this._userId = userId;
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
         * @type {string|null}
         * @private
         */
        this._userImage = userImage;
        /**
         *
         * @type {string}
         * @private
         */
        this._token = token;
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
     * @return {string|null}
     */
    getUserImage() {
        return this._userImage;
    }

    /**
     *
     * @return {string}
     */
    getToken() {
        return this._token;
    }
}
