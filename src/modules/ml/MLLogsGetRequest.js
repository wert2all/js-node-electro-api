import RequestInterface from "../../routers/request/RequestInterface";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import DI from "../../lib/di/DI";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import ImageListLogEvent from "../images/logs/event/ImageListLogEvent";
import ResponseResult from "../../routers/response/ResponseResult";
import UserEntity from "../../data/entity/UserEntity";
import UserDefinition from "../../db/definition/UserDefinition";
import AuthNoAdmin from "../auth/error/AuthNoAdmin";
import UserRepository from "../../db/repository/UserRepository";
import ConnectionInterface from "../../lib/db-connection/ConnectionInterface";
import ApiKeyProvider from "../auth/key/KeyProvider";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import MLLogsGetDataClass from "./data/MLLogsGetDataClass";

/**
 * @class MLLogsGetRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class MLLogsGetRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserRepository}
         * @private
         */
        this._usersRepository = new UserRepository();
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {MLLogsGetRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._usersRepository.setConnection(DI.getInstance().get(ConnectionInterface));
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
            const requestData = await this._prepareRequest(request);
            await this._checkAdmin(requestData);
            response.setData("logs", []);
            response.setStatus(true);
        } catch (e) {
            DI.getInstance().get(LoggerInterface).error(new ImageListLogEvent(e.message));

            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(new ResponseResult(ResponseResult.TYPE_JSON, response.getData()));
    }

    /**
     *
     * @param {MLLogsGetDataClass} requestData
     * @private
     */
    async _checkAdmin(requestData) {
        let isAdmin = false;
        const userEntity = new UserEntity();
        userEntity.setValue(UserDefinition.COLUMN_GOOGLE_ID, requestData.getAccount().getGoogleUserId());
        const users = await this._usersRepository.fetchData(userEntity);
        if (users.length === 1) {
            isAdmin = users[0].getIsAdmin() === "y";
        }
        if (isAdmin === false) {
            throw new AuthNoAdmin();
        }
    }

    /**
     *
     * @param request
     * @return {Promise<MLLogsGetDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = MLLogsGetDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {MLLogsGetDataClass} requestData
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
}
