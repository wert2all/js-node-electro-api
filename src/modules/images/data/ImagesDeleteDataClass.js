import StringExt from '../../../lib/utils/StringExt';
import AuthNoToken from '../../auth/error/AuthNoToken';

export default class ImagesDeleteDataClass {
    /**
     *
     * @param {string} token
     * @param {number} imageId
     */
    constructor(token, imageId) {
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
        this._imageId = imageId;
    }

    /**
     *
     * @param request
     * @return {ImagesDeleteDataClass}
     */
    static factory(request) {
        let authToken = null;
        let returnRequest = null;
        if (request.body.token) {
            authToken = Buffer.from(
                new StringExt(request.body.token)
                    .replaceAll('"', ''),
                'base64'
            ).toString();
        }
        const id = parseInt(request.body.image, 10);
        if (authToken !== null) {
            returnRequest = new ImagesDeleteDataClass(authToken, id);
        } else {
            throw new AuthNoToken();
        }

        return returnRequest;
    }

    /**
     *
     * @return {number}
     */
    getImageId() {
        return this._imageId;
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
     * @return {ImagesDeleteDataClass}
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
