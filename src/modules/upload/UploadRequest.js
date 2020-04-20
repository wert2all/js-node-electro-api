'use strict';
import RequestInterface from '../../request/RequestInterface';
import ResponseDataClass from './data/ResponseDataClass';
import RequestDataClass from './data/RequestDataClass';
import AuthCheck from '../auth/AuthCheck';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthParams from '../auth/params/Params';

/**
 * @class UploadRequest
 * @type RequestInterface
 */
export default class UploadRequest extends RequestInterface {

    /**
     *
     * @param {StorageProvider} storageProvider
     */
    constructor(storageProvider) {
        super();
        /**
         *
         * @type {StorageProvider}
         */
        this.storageProvider = storageProvider;
    }

    /**
     * @request {*} request
     * @return {Promise}
     * @public
     * @abstract
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = RequestDataClass.factory(request);
            requestData.googleUserID = this._getGoogleUserId(requestData);
        } catch (e) {
            response.status = false;
            response.message = e.message;
        }
        return Promise.resolve(response.toHash());
    }

    /**
     *
     * @param {RequestDataClass} requestData
     * @return {null}
     * @private
     */
    async _getGoogleUserId(requestData) {
        const apiKey = new ApiKeyProvider(this.storageProvider).get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.token)
            );
    }
}
