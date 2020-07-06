import StringExt from '../../../lib/utils/StringExt';
import ImagesGetNoToken from '../error/ImagesGetNoToken';

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
            authToken = Buffer.from(
                new StringExt(request.query.token)
                    .replaceAll('"', ''),
                'base64'
            ).toString();
        }
        if (authToken !== null) {
            returnRequest = new ImagesGetDataClass(authToken);
            if (request.query.from) {
                const fromLimit = parseInt(request.query.from, 10);
                returnRequest.setFromLimit(fromLimit);
            }
        } else {
            throw new ImagesGetNoToken();
        }

        return returnRequest;
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
