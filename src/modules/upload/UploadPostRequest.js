"use strict";
import RequestInterface from "../../routers/request/RequestInterface";
import UploadRequestDataClass from "./data/UploadRequestDataClass";
import AuthCheck from "../auth/AuthCheck";
import ApiKeyProvider from "../auth/key/KeyProvider";
import AuthParams from "../auth/params/Params";
import UserEntity from "../../data/entity/UserEntity";
import UserFilesEntity from "../../data/entity/UserFilesEntity";
import FilesRepository from "../../db/repository/FilesRepository";
import UploadRequestBadMime from "./error/UploadRequestBadMime";
import UploadRequestBadSize from "./error/UploadRequestBadSize";
import FileTypeImage from "../../data/files/types/FileTypeImage";
import FileData from "../../data/files/FileData";
import FileSize from "../../data/files/size/FileSize";
import UploadRequestCantTmpUpload from "./error/UploadRequestCantTmpUpload";
import ImageFileNameProvider from "./imageprocess/ImageFileNameProvider";
import EntityManager from "../../lib/db-entity-manager/EntityManager";
import UserRepository from "../../db/repository/UserRepository";
import UploadRequestCantSave from "./error/UploadRequestCantSave";
import EventFileUpload from "./dispatch/event/EventFileUpload";
import ResponseResult from "../../routers/response/ResponseResult";
import ResponseDataClass from "../../routers/response/ResponseDataClass";
import DI from "../../lib/di/DI";
import FileStorage from "../../storage/FileStorage";
import ServerConfig from "../../server/ServerConfig";
import FileLogger from "../../lib/logger/adapters/FileLogger";
import LogFormatterInterface from "../../lib/logger/LogFormatterInterface";
import LoggerStrategy from "../../extended/LoggerStrategy";
import LoggerInterface from "../../lib/logger/LoggerInterface";
import Logger from "../../extended/logger/Logger";
import UploadEvent from "./logger/UploadEvent";
import ReadConnectionInterface from "../../lib/db-connection/ReadConnectionInterface";

/**
 * @class UploadPostRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UploadPostRequest extends RequestInterface {
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
         * @type {FileStorage}
         * @private
         */
        this._fileStorage = DI.getInstance().get(FileStorage);
        /**
         *
         * @type {EntityManager}
         * @private
         */
        this._em = DI.getInstance().get(EntityManager);
        /**
         *
         * @type {DispatchInterface}
         * @private
         */
        this._dispatcher = null;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     * @abstract
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            const userFilesEntity = this.makeUserFilesEntity(requestData);
            const fileData = await this._getFileData(requestData);
            /**
             * @type {EntityInterface[]}
             */
            const userFileList = await this._repository.fetchData(userFilesEntity);
            if (userFileList.length === 0) {
                await this._saveFile(fileData, userFilesEntity);
            }
            response.setStatus(true);
        } catch (e) {
            console.log(e);
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(new ResponseResult(ResponseResult.TYPE_JSON, response.getData()));
    }

    /**
     *
     * @param {UploadRequestDataClass} requestData
     * @return {UserFilesEntity}
     */
    makeUserFilesEntity(requestData) {
        const userEntity = new UserEntity().setGoogleAccount(requestData.getGoogleAccount());
        return new UserFilesEntity()
            .setUser(userEntity)
            .setType(requestData.getType())
            .setYearMon(requestData.getYearMon());
    }

    /**
     *
     * @param {UploadRequestDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        return await new AuthCheck(ApiKeyProvider.getDefault()).check(new AuthParams(requestData.token));
    }

    /**
     *
     * @param {FileData} fileData
     * @param {UserFilesEntity} userFiles
     * @return {Promise<void>}
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    async _saveFile(fileData, userFiles) {
        try {
            const tmpFilePath = await this._moveFileToTmpDirectory(fileData.getFsLink(), fileData.getName());
            fileData = await this._fileStorage.moveFile(
                fileData.setPath(tmpFilePath),
                new ImageFileNameProvider(userFiles)
            );
            /**
             *
             * @type {EntityManager}
             */
            const entityManager = this._em;
            const userEntity = await entityManager.save(new UserRepository().getDefinition(), userFiles.getUser());
            userFiles.setUser(userEntity).setFilePath(fileData.getPath());
            /**
             *
             * @type {EntityInterface}
             */
            const file = await entityManager.save(this._repository.getDefinition(), userFiles);
            await this._dispatcher.dispatch(new EventFileUpload(file));
        } catch (e) {
            console.log(e.message);
            return Promise.reject(new UploadRequestCantSave());
        }

        return Promise.resolve();
    }

    /**
     *
     * @param {UploadRequestDataClass} requestData
     * @return {Promise<FileData>}
     * @private
     */
    async _getFileData(requestData) {
        if (!requestData.billFile.hasOwnProperty("mimetype")) {
            return Promise.reject(new UploadRequestBadMime());
        }
        const fileType = FileTypeImage.fabric(requestData.billFile.mimetype);
        if (fileType === false) {
            return Promise.reject(new UploadRequestBadMime());
        }
        if (!requestData.billFile.hasOwnProperty("size")) {
            return Promise.reject(new UploadRequestBadSize());
        }
        const fileSize = FileSize.fabric(requestData.billFile.size);
        if (fileSize === false) {
            return Promise.reject(new UploadRequestBadSize());
        }

        return Promise.resolve(
            new FileData(requestData.billFile.name, fileType, fileSize).setFileFsLink(requestData.billFile)
        );
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {UploadPostRequest}
     */
    init(dispatcher) {
        /**
         *
         * @type {DispatchInterface}
         * @private
         */
        this._dispatcher = dispatcher;
        this._repository.setConnection(DI.getInstance().get(ReadConnectionInterface));
        this._applyLogger();
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @return {string}
     * @private
     */
    _getTmpFilePath(fileName) {
        const tmpDirectory = this._fileStorage.getConfig().getTmpDirectory();
        return tmpDirectory + new Date().valueOf().toString() + "_" + fileName;
    }

    /**
     *
     * @param {{mv:function(string, function)}} fileObj
     * @param {string} fileName
     * @return {Promise<string>}
     * @private
     */
    async _moveFileToTmpDirectory(fileObj, fileName) {
        return new Promise((resolve, reject) => {
            const tmpFileName = this._getTmpFilePath(fileName);
            fileObj.mv(tmpFileName, (err) => {
                if (err) {
                    reject(new UploadRequestCantTmpUpload());
                }
                resolve(tmpFileName);
            });
        });
    }

    /**
     *
     * @param request
     * @return {Promise<UploadRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UploadRequestDataClass.factory(request);
        requestData.setGoogleAccount(await this._getGoogleAccount(requestData));
        return Promise.resolve(requestData);
    }

    /**
     *
     * @private
     */
    _applyLogger() {
        const di = DI.getInstance();
        const path = di.get(ServerConfig).getLogDirectory() + "upload.log";
        const fileLogger = new FileLogger(path, di.get(LogFormatterInterface));
        const loggerStrategy = di.get(LoggerStrategy).addLogger(UploadEvent.TAG, fileLogger);
        di.register(LoggerStrategy, loggerStrategy);
        di.register(LoggerInterface, new Logger(di.get(LoggerStrategy)));
    }
}
