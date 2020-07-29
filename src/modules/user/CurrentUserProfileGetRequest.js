import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import UserProfileRequestDataClass from './data/UserProfileRequestDataClass';
import UserProfileRepository from '../../db/repository/UserProfileRepository';
import ResponseResult from '../../routers/response/ResponseResult';
import DI from '../../lib/di/DI';
import ConnectionInterface from '../../lib/db-connection/ConnectionInterface';
import LoggerInterface from '../../lib/logger/LoggerInterface';
import UserProfileLogEvent from './logs/event/UserProfileLogEvent';
import UserProfileFetchModel from './model/UserProfileFetchModel';

/**
 * @class CurrentUserProfileGetRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class CurrentUserProfileGetRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserProfileRepository}
         * @private
         */
        this._repository = new UserProfileRepository();

        /**
         *
         * @type {UserProfileFetchModel}
         * @private
         */
        this._fetchModel = new UserProfileFetchModel(this._repository);
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            /**
             *
             * @type {UserProfileRequestDataClass}
             */
            const requestData = await this._prepareRequest(request);
            requestData.setGoogleUserId(requestData.getGoogleAccount().getGoogleUserId());
            await this._fetchModel.extendResponseUserProfile(response, requestData);
            response.setStatus(true);
        } catch (e) {
            DI.getInstance()
                .get(LoggerInterface)
                .error(new UserProfileLogEvent(e.message));
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
     * @return {Promise<UserProfileRequestDataClass>}
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
        return await new AuthCheck(ApiKeyProvider.getDefault())
            .check(
                new AuthParams(requestData.getToken())
            );
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {CurrentUserProfileGetRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._repository.setConnection(DI.getInstance().get(ConnectionInterface));
        return this;
    }
}
