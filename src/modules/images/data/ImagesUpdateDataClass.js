import StringExt from '../../../lib/utils/StringExt';
import AuthNoToken from '../../auth/error/AuthNoToken';
import NoIdError from '../error/NoIdError';

/**
 * @class ImagesUpdateDataClass
 */
export default class ImagesUpdateDataClass {
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
        /**
         *
         * @type {boolean}
         * @private
         */
        this._isReady = false;
        /**
         *
         * @type {string}
         * @private
         */
        this._type = 'bill';
        /**
         *
         * @type {number}
         * @private
         */
        this._rotation = 0;
    }

    /**
     *
     * @param request
     * @return {ImagesUpdateDataClass}
     */
    // eslint-disable-next-line max-statements
    static factory(request) {
        let authToken = null;
        let id = null;
        let returnRequest = null;
        if (request.body.token) {
            authToken = Buffer.from(
                new StringExt(request.body.token)
                    .replaceAll('"', ''),
                'base64'
            ).toString();
        }
        if (request.body.id) {
            id = parseInt(request.body.id, 10);
        }
        if (!Number.isInteger(id)) {
            throw new NoIdError();
        }
        if (authToken !== null) {
            returnRequest = new ImagesUpdateDataClass(authToken, id);
        } else {
            throw new AuthNoToken();
        }

        if (request.body.isReady && request.body.isReady === 'true') {
            returnRequest.setIsReady(true);
        }
        if (request.body.type) {
            returnRequest.setType(
                (request.body.type === 'bill') ? 'bill' : 'meter'
            );
        }

        if (request.body.rotation) {
            returnRequest.setRotation(request.body.rotation);
        }
        return returnRequest;
    }

    /**
     *
     * @return {string}
     */
    getType() {
        return this._type;
    }

    /**
     *
     * @param {string} value
     * @return {ImagesUpdateDataClass}
     */
    setType(value) {
        this._type = value;
        return this;
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
     * @param {boolean} value
     * @return {ImagesUpdateDataClass}
     */
    setIsReady(value) {
        this._isReady = value;
        return this;
    }

    /**
     *
     * @return {boolean}
     */
    isReady() {
        return this._isReady;
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
     * @return {ImagesUpdateDataClass}
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
    getAccount() {
        return this._account;
    }

    /**
     *
     * @param {number} rotation
     * @return {ImagesUpdateDataClass}
     */
    setRotation(rotation) {
        this._rotation = rotation;
        return this;
    }
}
