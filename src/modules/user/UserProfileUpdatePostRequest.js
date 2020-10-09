import RequestInterface from "../../routers/request/RequestInterface";
import UserProfileRepository from "../../db/repository/UserProfileRepository";
import ApiKeyProvider from "../auth/key/KeyProvider";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import UserProfileUpdateRequestDataClass from "./data/UserProfileUpdateRequestDataClass";
import UserEntity from "../../data/entity/UserEntity";
import UserProfileEntity from "../../data/entity/UserProfileEntity";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import ResponseResult from "../../routers/response/ResponseResult";
import UserRepository from "../../db/repository/UserRepository";
import DI from "../../lib/di/DI";
import ConnectionInterface from "../../lib/db-connection/ConnectionInterface";
import UserProfileDefinition from "../../db/definition/UserProfileDefinition";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import UserProfileLogEvent from "./logs/event/UserProfileLogEvent";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import UserDefinition from "../../db/definition/UserDefinition";
import AuthNoAdmin from "../auth/error/AuthNoAdmin";

/**
 * @class UserProfileUpdatePostRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class UserProfileUpdatePostRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserProfileRepository}
         * @private
         */
        this._profileRepository = new UserProfileRepository();
        /**
         *
         * @type {UserRepository}
         * @private
         */
        this._userRepository = new UserRepository();
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
     * @return {UserProfileUpdatePostRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._profileRepository.setConnection(this._di.get(ConnectionInterface));
        this._userRepository.setConnection(this._di.get(ConnectionInterface));
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            /**
             *
             * @type {EntityManager}
             */
            const em = this._di.get(EntityManager);

            const hash = await this._createProfileHash(requestData.getUserId());
            const profileEntities = await this._createEntities(requestData, hash);
            profileEntities.map(async (entity) => await em.save(this._profileRepository.getDefinition(), entity));
            await em.save(
                this._userRepository.getDefinition(),
                new UserEntity().create(requestData.getGoogleAccount().toHash())
            );
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
     * @return {Promise<UserProfileUpdateRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UserProfileUpdateRequestDataClass.factory(request);
        if (request.body.userId) {
            requestData.setGoogleAccount(
                await this._getGoogleAccount(
                    requestData,
                    new ApiKeyProvider(
                        DI.getInstance().get(StorageConfiguration).getSecretStorage(),
                        "google:api:signin:client:key"
                    ).get()
                )
            );
            requestData.setUserId(request.body.userId);
            await this._checkAdmin(requestData);
        } else {
            requestData.setGoogleAccount(await this._getGoogleAccount(requestData, ApiKeyProvider.getDefault()));
            requestData.setUserId(requestData.getGoogleAccount().getGoogleUserId());
        }
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UserProfileUpdateRequestDataClass} requestData
     * @param {string} key
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData, key) {
        return await new AuthCheck(key).check(new AuthParams(requestData.getToken()));
    }

    /**
     *
     * @param {UserProfileUpdateRequestDataClass} requestData
     * @param {Object<string, string>}hash
     * @returns {UserProfileEntity[]}
     * @private
     */
    async _createEntities(requestData, hash) {
        const ret = [];
        const payment = requestData.getPayment();
        ["company_name", "iban", "bic", "edrpou", "personal_number", "cs"].map((valueName) => {
            const entity = this._makeEntity(requestData.getUserId(), valueName, payment.getData(valueName));
            const key = this._createKey(entity.getValue("value_type"), entity.getValue("value_name"));
            if (hash.hasOwnProperty(key)) {
                entity.setValue(UserProfileDefinition.COLUMN_ID, hash[key]);
            }
            ret.push(entity);
        });
        return ret;
    }

    /**
     *
     * @param {string} userId
     * @return {Promise<{}>}
     * @private
     */
    async _createProfileHash(userId) {
        const userProfile = await this._profileRepository.fetchData(this._createCleanProfileEntity(userId));
        return userProfile.reduce((prev, entity) => {
            const key = this._createKey(entity.getValue("value_type"), entity.getValue("value_name"));
            prev[key] = entity.getValue(UserProfileDefinition.COLUMN_ID);
            return prev;
        }, {});
    }

    /**
     *
     * @param {string} userId
     * @param {string} valueName
     * @param {string} value
     * @returns {UserProfileEntity}
     * @private
     */
    _makeEntity(userId, valueName, value) {
        const userProfileEntity = this._createCleanProfileEntity(userId);

        userProfileEntity.setValue("value_type", "payment");
        userProfileEntity.setValue("value_name", valueName);
        userProfileEntity.setValue("value", value);

        return userProfileEntity;
    }

    /**
     *
     * @returns {UserProfileEntity}
     * @private
     * @param {string} userId
     */
    _createCleanProfileEntity(userId) {
        /**
         *
         * @type {UserEntity}
         */
        const userEntity = new UserEntity();
        userEntity.setValue(UserDefinition.COLUMN_GOOGLE_ID, userId);
        const userProfileEntity = new UserProfileEntity();
        userProfileEntity.setUser(userEntity);
        return userProfileEntity;
    }

    /**
     *
     * @param {string} type
     * @param {string} name
     * @returns {string}
     * @private
     */
    _createKey(type, name) {
        return type + ":" + name;
    }

    /**
     *
     * @param {UserProfileUpdateRequestDataClass} requestData
     * @private
     */
    async _checkAdmin(requestData) {
        let isAdmin = false;
        const userEntity = new UserEntity();
        userEntity.setValue(UserDefinition.COLUMN_GOOGLE_ID, requestData.getGoogleAccount().getGoogleUserId());
        const users = await this._userRepository.fetchData(userEntity);
        if (users.length === 1) {
            isAdmin = users[0].getIsAdmin() === "y";
        }
        if (isAdmin === false) {
            throw new AuthNoAdmin();
        }
    }
}
