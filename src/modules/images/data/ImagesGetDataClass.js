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
    }

    /**
     *
     * @param request
     * @return {ImagesGetDataClass}
     */
    static factory(request) {
        const authToken = Buffer.from(
            new StringExt(request.query.token)
                .replaceAll('"', ''),
            'base64'
        ).toString();
        if (!authToken) {
            throw new ImagesGetNoToken();
        }
        return new ImagesGetDataClass(authToken);
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
