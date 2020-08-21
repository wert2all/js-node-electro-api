import RequestInterface from '../../routers/request/RequestInterface';
import ResponseResult from '../../routers/response/ResponseResult';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import DI from '../../lib/di/DI';
import LoggerInterface from '../../lib/logger/LoggerInterface';
import ImageListLogEvent from './logs/event/ImageListLogEvent';
import ApiKeyProvider from '../auth/key/KeyProvider';
import StorageConfiguration from '../../storage/configuration/StorageConfiguration';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import ImagesUpdateDataClass from './data/ImagesUpdateDataClass';

/**
 * @class ImagesUpdateRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class ImagesUpdateRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {DI}
         * @private
         */
        this._di = DI.getInstance();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {ImagesUpdateRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            /**
             *
             * @type {ImagesUpdateDataClass}
             */
            const requestData = await this._prepareRequest(request);

            response.setData('dump', requestData);
            response.setStatus(true);
        } catch (e) {
            this._di.get(LoggerInterface)
                .error(new ImageListLogEvent(e.message));
            response.setStatus(false);
            response.setMessage(e.message);
        }
        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_JSON, response.getData())
        );
    }

    /**
     *
     * @param request
     * @return {Promise<ImagesUpdateDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = ImagesUpdateDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {ImagesUpdateDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        const apiKey = new ApiKeyProvider(
            this._di.get(StorageConfiguration)
                .getSecretStorage(),
            'google:api:signin:client:key'
        )
            .get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.getToken())
            );
    }
}
