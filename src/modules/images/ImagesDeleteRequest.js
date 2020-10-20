import RequestInterface from "../../routers/request/RequestInterface";
import FilesRepository from "../../db/repository/FilesRepository";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import ResponseResult from "../../routers/response/ResponseResult";
import ApiKeyProvider from "../auth/key/KeyProvider";
import AuthCheck from "../auth/AuthCheck";
import AuthParams from "../auth/params/Params";
import UserRepository from "../../db/repository/UserRepository";
import UserEntity from "../../data/entity/UserEntity";
import UserDefinition from "../../db/definition/UserDefinition";
import DI from "../../lib/di/DI";
import ImageOriginalUrl from "../../extended/images/providers/ImageOriginalUrl";
import StorageConfiguration from "../../storage/configuration/StorageConfiguration";
import ImagesDeleteDataClass from "./data/ImagesDeleteDataClass";
import UserFilesEntity from "../../data/entity/UserFilesEntity";
import UserFilesDefinition from "../../db/definition/UserFilesDefinition";
import fs from "fs";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import ImageLogEvent from "./log/ImageLogEvent";
import LoggerStrategy from "../../extended/LoggerStrategy";
import FileLogger from "../../lib/logger/adapters/FileLogger";
import ServerConfig from "../../server/ServerConfig";
import LogFormatterInterface from "../../lib/logger/LogFormatterInterface";
import Logger from "../../extended/logger/Logger";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import AuthNoAdmin from "../auth/error/AuthNoAdmin";
import ImageListLogEvent from "./logs/event/ImageListLogEvent";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

/**
 * @class ImagesDeleteRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class ImagesDeleteRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {FilesRepository}
         * @private
         */
        this._repository = new FilesRepository();
        /**
         *
         * @type {UserRepository}
         * @private
         */
        this._usersRepository = new UserRepository();
        /**
         *
         * @type {ImageOriginalUrl}
         * @private
         */
        this._imageUrlProvider = DI.getInstance().get(ImageOriginalUrl);
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
     * @return {ImagesDeleteRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._repository.setConnection(this._di.get(ReadConnectionInterface));
        this._usersRepository.setConnection(this._di.get(ReadConnectionInterface));
        this._applyLogger();
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
            /**
             *
             * @type {UserFilesEntity|null}
             */
            const imageData = await this._getImage(requestData.getImageId());
            if (imageData != null) {
                this._deleteImageFile(imageData);
                await this._deleteImageFromDB(imageData);
            }
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
     * @param request
     * @return {Promise<ImagesDeleteDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = ImagesDeleteDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {ImagesDeleteDataClass} requestData
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
     * @param {ImagesDeleteDataClass} requestData
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
     * @private
     */
    _deleteImageFile(imageData) {
        const path = imageData.getValue(UserFilesDefinition.COLUMN_PATH);
        fs.unlink(path, (err) => {
            if (err != null) {
                this._di.get(LoggerInterface).info(new ImageLogEvent(err.message));
            }
        });
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
     * @param {UserFilesEntity} imageData
     * @return {Promise<void>}
     * @private
     */
    async _deleteImageFromDB(imageData) {
        return this._di
            .get(EntityManager)
            .delete(this._repository.getDefinition(), imageData.getValue(UserFilesDefinition.COLUMN_ID));
    }
}
