import RequestInterface from "../../routers/request/RequestInterface";
import ResponseResult from "../../routers/response/ResponseResult";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import DI from "../../lib/di/DI";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import ImageListLogEvent from "./logs/event/ImageListLogEvent";
import ApiKeyProvider from "../auth/key/KeyProvider";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import ImagesUpdateDataClass from "./data/ImagesUpdateDataClass";
import UserEntity from "../../data/entity/UserEntity";
import UserDefinition from "../../db/definition/UserDefinition";
import AuthNoAdmin from "../auth/error/AuthNoAdmin";
import UserRepository from "../../db/repository/UserRepository";
import ServerConfig from "../../server/ServerConfig";
import FileLogger from "../../lib/logger/adapters/FileLogger";
import LogFormatterInterface from "../../lib/logger/LogFormatterInterface";
import LoggerStrategy from "../../extended/LoggerStrategy";
import ImageLogEvent from "./log/ImageLogEvent";
import Logger from "../../extended/logger/Logger";
import ImageListNoImage from "./error/ImageListNoImage";
import UserFilesEntity from "../../data/entity/UserFilesEntity";
import FilesRepository from "../../db/repository/FilesRepository";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import ExtendedValuesEntity from "../../data/entity/ExtendedValuesEntity";
import UserFilesDefinition from "../../db/definition/UserFilesDefinition";
import ExtendedValuesRepository from "../../db/repository/ExtendedValuesRepository";
import ExtendedValuesEntityManager from "../../extended/ExtendedValuesEntityManager";
import ImagesValues from "../../data/entity/ext/ImagesValues";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

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
        /**
         *
         * @type {UserRepository}
         * @private
         */
        this._usersRepository = new UserRepository();
        /**
         *
         * @type {FilesRepository}
         * @private
         */
        this._repository = new FilesRepository();
        /**
         *
         * @type {ExtendedValuesRepository}
         * @private
         */
        this._extRepository = new ExtendedValuesRepository();
        /**
         *
         * @type {EntityManager}
         * @private
         */
        this._em = this._di.get(EntityManager);
        /**
         *
         * @type {ExtendedValuesEntityManager}
         * @private
         */
        this._extEm = new ExtendedValuesEntityManager(this._em);
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {ImagesUpdateRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        /**
         *
         * @type {ReadConnectionInterface}
         */
        const readConnection = this._di.get(ReadConnectionInterface);
        this._usersRepository.setConnection(readConnection);
        this._extRepository.setConnection(readConnection);
        this._repository.setConnection(readConnection);
        this._applyLogger();
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line max-statements
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            /**
             *
             * @type {ImagesUpdateDataClass}
             */
            const requestData = await this._prepareRequest(request);
            await this._checkAdmin(requestData);
            /**
             *
             * @type {UserFilesEntity|null}
             */
            const imageData = await this._getImage(requestData.getImageId());
            if (imageData != null) {
                const imageEntity = this._updateEntity(imageData, requestData);
                await this._saveImage(imageEntity);
                const extEntity = this._createExtEntity(requestData, imageEntity);
                const savedExtData = await this._extEm.save(extEntity);
                response.setData("dump", savedExtData);
                response.setStatus(true);
            } else {
                const error = new ImageListNoImage();
                response.setStatus(false);
                response.setMessage(error.message);
            }
        } catch (e) {
            this._di.get(LoggerInterface).error(new ImageListLogEvent(e.message));
            response.setStatus(false);
            response.setMessage(e.message);
        }
        return Promise.resolve(new ResponseResult(ResponseResult.TYPE_JSON, response.getData()));
    }

    /**
     *
     * @param request
     * @return {Promise<ImagesUpdateDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = ImagesUpdateDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
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
            this._di.get(StorageConfiguration).getSecretStorage(),
            "google:api:signin:client:key"
        ).get();
        return await new AuthCheck(apiKey).check(new AuthParams(requestData.getToken()));
    }

    /**
     *
     * @param {ImagesUpdateDataClass} requestData
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
     * @private
     */
    _applyLogger() {
        const path = this._di.get(ServerConfig).getLogDirectory() + "imagelist.log";
        const fileLogger = new FileLogger(path, this._di.get(LogFormatterInterface));
        const loggerStrategy = this._di.get(LoggerStrategy).addLogger(ImageLogEvent.TAG, fileLogger);
        this._di.register(LoggerStrategy, loggerStrategy);
        this._di.register(LoggerInterface, new Logger(this._di.get(LoggerStrategy)));
    }

    /**
     *
     * @param {number} imageId
     * @return {Promise<UserFilesEntity|null>}
     * @private
     */
    async _getImage(imageId) {
        const images = await this._repository.fetchData(UserFilesEntity.factory(imageId));
        return Promise.resolve(images[0]);
    }

    /**
     *
     * @param {UserFilesEntity} imageData
     * @param {ImagesUpdateDataClass} requestData
     * @return {UserFilesEntity}
     * @private
     */
    _updateEntity(imageData, requestData) {
        imageData.setType(requestData.getType()).setReady(requestData.isReady());
        return imageData;
    }

    /**
     *
     * @param {UserFilesEntity} imageEntity
     * @return {Promise<ImagesUpdateRequest>}
     * @private
     */
    async _saveImage(imageEntity) {
        /**
         *
         * @type {EntityManager}
         */
        const entityManager = this._di.get(EntityManager);
        return entityManager.save(this._repository.getDefinition(), imageEntity);
    }

    /**
     *
     * @param {ImagesUpdateDataClass} requestData
     * @param {UserFilesEntity} imageEntity
     * @return {ExtendedValuesEntity}
     * @private
     */
    _createExtEntity(requestData, imageEntity) {
        const entity = ExtendedValuesEntity.createExtended(
            ImagesValues.TYPE,
            imageEntity.getValue(UserFilesDefinition.COLUMN_ID)
        );
        return entity.setValue(ImagesValues.ROTATION, requestData.getRotation());
    }
}
