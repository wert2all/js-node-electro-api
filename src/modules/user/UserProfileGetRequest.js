import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from '../../routers/response/ResponseDataClass';

/**
 * @class UserProfileGetRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UserProfileGetRequest extends RequestInterface {
    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
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
