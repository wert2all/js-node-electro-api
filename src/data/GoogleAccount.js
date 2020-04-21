export default class GoogleAccount {
    /**
     *
     * @param {string} googleUserId
     * @param {string} name
     * @param {string} email
     */
    constructor(googleUserId, name, email) {
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


    /**
     *
     * @param {TokenPayload} tokenPayload
     * @return GoogleAccount
     */
    static create(tokenPayload) {
        console.log(tokenPayload);
        return new GoogleAccount(tokenPayload.sub, tokenPayload.name, tokenPayload.email);
    }
}
