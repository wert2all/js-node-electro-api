import RequestInterface from "../../routers/request/RequestInterface";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import ApiKeyProvider from "../auth/key/KeyProvider";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import UserProfileRequestDataClass from "./data/UserProfileRequestDataClass";
import UserProfileRepository from "../../db/repository/UserProfileRepository";
import UserEntity from "../../data/entity/UserEntity";
import ResponseResult from "../../routers/response/ResponseResult";
import DI from "../../lib/di/DI";
import UserDefinition from "../../db/definition/UserDefinition";
import AuthNoAdmin from "../auth/error/AuthNoAdmin";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import UserProfileLogEvent from "./logs/event/UserProfileLogEvent";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import UserRepository from "../../db/repository/UserRepository";
import UserProfileFetchModel from "./model/UserProfileFetchModel";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

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
        /**
         *
         * @type {UserRepository}
         * @private
         */
        this._usersRepository = new UserRepository();
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
            await this._checkAdmin(requestData);
            await this._fetchModel.extendResponseUserProfile(response, requestData);
            response.setStatus(true);
        } catch (e) {
            DI.getInstance().get(LoggerInterface).error(new UserProfileLogEvent(e.message));
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(new ResponseResult(ResponseResult.TYPE_JSON, response.getData()));
    }

    /**
     *
     * @param request
     * @return {Promise<UserProfileRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UserProfileRequestDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UserProfileRequestDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        const apiKey = new ApiKeyProvider(
            DI.getInstance().get(StorageConfiguration).getSecretStorage(),
            "google:api:signin:client:key"
        ).get();
        return await new AuthCheck(apiKey).check(new AuthParams(requestData.getToken()));
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {UserProfileGetRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._repository.setConnection(DI.getInstance().get(ReadConnectionInterface));
        this._usersRepository.setConnection(DI.getInstance().get(ReadConnectionInterface));
        return this;
    }

    /**
     *
     * @param {UserProfileRequestDataClass} requestData
     * @private
     */
    async _checkAdmin(requestData) {
        let isAdmin = false;
        const userEntity = new UserEntity();
        userEntity.setValue(UserDefinition.COLUMN_GOOGLE_ID, requestData.getGoogleAccount().getGoogleUserId());
        const users = await this._usersRepository.fetchData(userEntity);
        if (users.length === 1) {
            isAdmin = users[0].getIsAdmin() === "y";
        }
        if (isAdmin === false) {
            throw new AuthNoAdmin();
        }
    }
}
