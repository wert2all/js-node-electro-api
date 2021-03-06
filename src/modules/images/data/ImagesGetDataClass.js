import StringExt from "../../../lib/utils/StringExt";
import AuthNoToken from "../../auth/error/AuthNoToken";

export default class ImagesGetDataClass {
    /**
     *
     * @param {string} token
     */
    constructor(token) {
        /**
         *
         * @type {string}
         * @private
         */
        this._token = token;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
        /**
         *
         * @type {number}
         * @private
         */
        this._fromLimit = 0;
        this._offsetLimit = null;
    }

    /**
     *
     * @param request
     * @return {ImagesGetDataClass}
     */
    static factory(request) {
        let authToken = null;
        let returnRequest = null;
        if (request.query.token) {
            authToken = Buffer.from(new StringExt(request.query.token).replaceAll('"', ""), "base64").toString();
        }
        if (authToken !== null) {
            returnRequest = new ImagesGetDataClass(authToken);
            if (request.query.from) {
                const fromLimit = parseInt(request.query.from, 10);
                returnRequest.setFromLimit(fromLimit);
            }
            if (request.query.offset) {
                const offsetLimit = parseInt(request.query.offset, 10);
                returnRequest.setOffsetLimit(offsetLimit);
            }
        } else {
            throw new AuthNoToken();
        }

        return returnRequest;
    }

    /**
     *
     * @return {number|null}
     */
    getOffsetLimit() {
        return this._offsetLimit;
    }

    /**
     *
     * @param {number} value
     * @return {ImagesGetDataClass}
     */
    setOffsetLimit(value) {
        this._offsetLimit = value;
        return this;
    }

    /**
     *
     * @return {number}
     */
    getFromLimit() {
        return this._fromLimit;
    }

    /**
     *
     * @param {number} value
     * @return {ImagesGetDataClass}
     */
    setFromLimit(value) {
        this._fromLimit = value;
        return this;
    }

    /**
     *
     * @return {GoogleAccount|null}
     */
    getAccount() {
        return this._account;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {ImagesGetDataClass}
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
     * @return {string}
     */
    getToken() {
        return this._token;
    }
}
