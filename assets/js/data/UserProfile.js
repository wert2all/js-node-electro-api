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
     * @param {string} token
     */
    constructor(userId, userName, userEmail, userImage, token) {
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
        /**
         *
         * @type {string}
         * @private
         */
        this._personalNumber = '';
        /**
         *
         * @type {string}
         * @private
         */
        this._KC = '';
        /**
         *
         * @type {string}
         * @private
         */
        this._companyName = '';
        /**
         *
         * @type {string}
         * @private
         */
        this._iban = '';
        /**
         *
         * @type {string}
         * @private
         */
        this._big = '';
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
    getToken() {
        return this._token;
    }

    /**
     *
     * @param {string} value
     * @return {UserProfile}
     */
    setBIG(value) {
        this._big = value;
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {UserProfile}
     */
    setIBAN(value) {
        this._iban = value;
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {UserProfile}
     */
    setCompanyName(value) {
        this._companyName = value;
        return this;
    }

    /**
     *
     * @param {string} value
     * @return {UserProfile}
     */
    setKC(value) {
        this._KC = value;
        return this;
    }

    /**
     *
     * @param {string} value
     * @return UserProfile
     */
    setPersonalNumber(value) {
        this._personalNumber = value;
        return this;
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

    /**
     *
     * @return {string}
     */
    getPersonalNumber() {
        return this._personalNumber;
    }

    /**
     *
     * @return {string}
     */
    getKC() {
        return this._KC;
    }

    /**
     *
     * @return {string}
     */
    getCompanyName() {
        return this._companyName;
    }

    /**
     *
     * @return {string}
     */
    getIBAN() {
        return this._iban;
    }

    /**
     *
     * @return {string}
     */
    getBIG() {
        return this._big;
    }
}
