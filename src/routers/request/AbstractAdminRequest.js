import RequestInterface from "./RequestInterface";
import ImplementationError from "../../lib/implementation-error/ImplementationError";
import ResponseDataClass from "../response/ResponseDataClass";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import ResponseResult from "../response/ResponseResult";
import ApiKeyProvider from "../../modules/auth/key/KeyProvider";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import AuthCheck from "../../modules/auth/AuthCheck";
import AuthParams from "../../modules/auth/params/Params";
import UserEntity from "../../data/entity/UserEntity";
import UserDefinition from "../../db/definition/UserDefinition";
import AuthNoAdmin from "../../modules/auth/error/AuthNoAdmin";
import UserRepository from "../../db/repository/UserRepository";

/**
 * @abstract
 * @class AbstractAdminRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class AbstractAdminRequest extends RequestInterface {
    /**
     *
     * @param {RequestDataFactoryInterface} requestDataFactory
     * @param {StorageConfiguration} storageConfig
     * @param {LoggerInterface} logger
     * @param {ErrorLogEventFactoryInterface} logEventFactory
     */
    constructor(requestDataFactory, storageConfig, logger, logEventFactory) {
        super();
        /**
         *
         * @type {StorageConfiguration}
         * @private
         */
        this._storageConfig = storageConfig;
        /**
         *
         * @type {LoggerInterface}
         * @private
         */
        this._logger = logger;
        /**
         *
         * @type {ErrorLogEventFactoryInterface}
         * @private
         */
        this._logEventFactory = logEventFactory;
        /**
         *
         * @type {RequestDataFactoryInterface}
         * @private
         */
        this._requestDataFactory = requestDataFactory;
        /**
         *
         * @type {UserRepository}
         * @protected
         */
        this._usersRepository = new UserRepository();
    }

    /**
     *
     * @param {ReadConnectionInterface} readConnection
     * @return AbstractAdminRequest
     */
    setConnection(readConnection) {
        this._usersRepository.setConnection(readConnection);
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
             * @type {RequestDataInterface}
             */
            const requestData = await this._prepareRequest(request);
            await this._checkAdmin(requestData);
            await this._processRequest(requestData, response);
            response.setStatus(true);
        } catch (e) {
            this._logger.error(this._logEventFactory.factory(error.message));
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(new ResponseResult(this._getResponseType(), response.getData()));
    }

    /**
     * @abstract
     * @param {DispatchInterface} dispatcher
     * @return RequestInterface
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        throw new ImplementationError(this, "init");
    }

    /**
     * @abstract
     * @return {string}
     * @protected
     */
    _getResponseType() {
        throw new ImplementationError(this, "_getResponseType");
    }

    /**
     *
     * @param request
     * @return {Promise<RequestDataInterface>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = this._requestDataFactory.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {RequestDataInterface} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        const apiKey = new ApiKeyProvider(this._storageConfig.getSecretStorage(), "google:api:signin:client:key").get();
        return await new AuthCheck(apiKey).check(new AuthParams(requestData.getToken()));
    }

    /**
     *
     * @param {RequestDataInterface} requestData
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
     * @abstract
     * @param {RequestDataInterface} requestData
     * @param {ResponseDataClass} response
     * @return {Promise<ResponseDataClass>}
     * @protected
     */
    async _processRequest(requestData, response) {
        throw new ImplementationError(this, "_processRequest");
    }
}
