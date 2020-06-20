/**
 * @class GoogleAccount
 */
export default class GoogleAccount {
    /**
     *
     * @param {string} googleUserId
     * @param {string} name
     * @param {string} email
     * @param {string} photo
     */
    constructor(googleUserId, name, email, photo = '') {
        /**
         *
         * @type {string}
         * @private
         */
        this._googleUserId = googleUserId;
        /**
         *
         * @type {string}
         * @private
         */
        this._name = name;
        /**
         *
         * @type {string}
         * @private
         */
        this._email = email;
        /**
         *
         * @type {string}
         * @private
         */
        this._photo = photo;
    }

    /**
     *
     * @param {TokenPayload} tokenPayload
     * @return GoogleAccount
     */
    static create(tokenPayload) {
        return new GoogleAccount(
            tokenPayload.sub,
            tokenPayload.name,
            tokenPayload.email,
            tokenPayload.picture
        );
    }

    /**
     *
     * @return {string}
     */
    getPhoto() {
        return this._photo;
    }

    /**
     *
     * @return {string}
     */
    getGoogleUserId() {
        return this._googleUserId;
    }

    /**
     *
     * @return {string}
     */
    getName() {
        return this._name;
    }

    /**
     *
     * @return {string}
     */
    getEmail() {
        return this._email;
    }
}
