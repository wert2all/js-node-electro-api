/**
 * @class UserProfileRequestDataClass
 *
 */
import StringExt from "../../../lib/utils/StringExt";
import AuthNoToken from "../../auth/error/AuthNoToken";

export default class UserProfileRequestDataClass {
    /**
     *
     * @param {string} authToken
     */
    constructor(authToken) {
        /**
         * @type string
         * @private
         */
        this._token = authToken;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
        /**
         *
         * @type {null|string}
         * @private
         */
        this._googleUserId = null;
    }

    /**
     *
     * @param request
     * @return UserProfileRequestDataClass
     */
    static factory(request) {
        const authToken = Buffer.from(new StringExt(request.query.token).replaceAll('"', ""), "base64").toString();
        if (!authToken) {
            throw new AuthNoToken();
        }
        const requestDataClass = new UserProfileRequestDataClass(authToken);
        if (request.query.hasOwnProperty("userid")) {
            return requestDataClass.setGoogleUserId(request.query.userid);
        }
        return requestDataClass;
    }

    /**
     *
     * @param value
     * @return {UserProfileRequestDataClass}
     */
    setGoogleUserId(value) {
        this._googleUserId = value;
        return this;
    }

    /**
     *
     * @return {null|string}
     */
    getGoogleUserId() {
        return this._googleUserId;
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
     * @param {GoogleAccount} account
     * @return {UserProfileRequestDataClass}
     */
    setGoogleAccount(account) {
        /**
         *
         * @type {string}
         * @private
         */
        this._account = account;
        return this;
    }

    /**
     *
     * @return {GoogleAccount|null}
     */
    getGoogleAccount() {
        return this._account;
    }
}
