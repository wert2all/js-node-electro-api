import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import UserPaymentDataClass from './data/UserPaymentDataClass';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import UserProfileRequestDataClass from './data/UserProfileRequestDataClass';
import UserProfileRepository from '../../db/repository/UserProfileRepository';

/**
 * @class UserProfileGetRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UserProfileGetRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserProfileRepository}
         * @private
         */
        this._repository = new UserProfileRepository();
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            // eslint-disable-next-line no-unused-vars
            const requestData = await this._prepareRequest(request);
            this._repository.setConnection(this._storageProvider.getConnection());
            const userPaymentData = new UserPaymentDataClass();
            response.setData('payment', userPaymentData.toHash());
            response.setStatus(true);
        } catch (e) {
            console.log(e);
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(response.toHash());
    }

    /**
     *
     * @param request
     * @return {Promise<UploadGetCountRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UserProfileRequestDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UserProfileRequestDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        const apiKey = new ApiKeyProvider(this._storageProvider).get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.token)
            );
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @return {UserProfileGetRequest}
     */
    init(storageProvider) {
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;
        return this;
    }
}
