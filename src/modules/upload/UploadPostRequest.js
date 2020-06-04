'use strict';
import RequestInterface from '../../routers/request/RequestInterface';
import UploadResponseDataClass from './data/UploadResponseDataClass';
import UploadRequestDataClass from './data/UploadRequestDataClass';
import AuthCheck from '../auth/AuthCheck';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthParams from '../auth/params/Params';
import UserEntity from '../../data/entity/UserEntity';
import UserFilesEntity from '../../data/entity/UserFilesEntity';
import FilesRepository from '../../db/repository/FilesRepository';
import UploadRequestBadMime from './error/UploadRequestBadMime';
import UploadRequestBadSize from './error/UploadRequestBadSize';
import FileTypeImage from '../../data/files/types/FileTypeImage';
import FileData from '../../data/files/FileData';
import FileSize from '../../data/files/size/FileSize';
import UploadRequestCantTmpUpload from './error/UploadRequestCantTmpUpload';
import ImageFileNameProvider from './imageprocess/ImageFileNameProvider';
import EntityManager from '../../lib/db-entity-manager/EntityManager';
import UserRepository from '../../db/repository/UserRepository';
import UploadRequestCantSave from './error/UploadRequestCantSave';
import EventFileUpload from './dispatch/event/EventFileUpload';
import ResponseResult from '../../routers/response/ResponseResult';

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
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseResult>}
     * @public
     * @abstract
     */
    async createResponse(request) {
        const response = new UploadResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            const userFilesEntity = this.makeUserFilesEntity(requestData);
            const fileData = await this._getFileData(requestData);

            this._repository.setConnection(this._storageProvider.getConnection());
            /**
             * @type {EntityInterface[]}
             */
            const userFileList = await this._repository.fetchData(userFilesEntity);
            if (userFileList.length === 0) {
                await this._saveFile(fileData, userFilesEntity);
            }
            response.status = true;
        } catch (e) {
            console.log(e);
            response.status = false;
            response.message = e.message;
        }

        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_JSON, response.getData())
        );
    }

    /**
     *
     * @param {UploadRequestDataClass} requestData
     * @return {UserFilesEntity}
     */
    makeUserFilesEntity(requestData) {
        const userEntity = new UserEntity()
            .setGoogleAccount(requestData.getGoogleAccount());
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
        const apiKey = new ApiKeyProvider(this._storageProvider).get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.token)
            );
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
            const tmpFilePath = await this._moveFileToTmpDirectory(
                fileData.getFsLink(),
                fileData.getName()
            );
            fileData = await this._storageProvider
                .getFileStorage()
                .moveFile(
                    fileData.setPath(tmpFilePath),
                    new ImageFileNameProvider(userFiles)
                );

            const entityManager = new EntityManager(this._repository.getConnection());
            const userEntity = await entityManager
                .save(new UserRepository().getDefinition(), userFiles.getUser());
            userFiles.setUser(userEntity)
                .setFilePath(fileData.getPath());
            /**
             *
             * @type {EntityInterface}
             */
            const file = await entityManager
                .save(this._repository.getDefinition(), userFiles);
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
        if (!requestData.billFile.hasOwnProperty('mimetype')) {
            return Promise.reject(new UploadRequestBadMime());
        }
        const fileType = FileTypeImage.fabric(requestData.billFile.mimetype);
        if (fileType === false) {
            return Promise.reject(new UploadRequestBadMime());
        }
        if (!requestData.billFile.hasOwnProperty(('size'))) {
            return Promise.reject(new UploadRequestBadSize());
        }
        const fileSize = FileSize.fabric(requestData.billFile.size);
        if (fileSize === false) {
            return Promise.reject(new UploadRequestBadSize());
        }

        return Promise.resolve(
            new FileData(requestData.billFile.name, fileType, fileSize)
                .setFileFsLink(requestData.billFile)
        );
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {UploadPostRequest}
     */
    init(storageProvider, dispatcher) {
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;
        /**
         *
         * @type {DispatchInterface}
         * @private
         */
        this._dispatcher = dispatcher;
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @return {string}
     * @private
     */
    _getTmpFilePath(fileName) {
        const tmpDirectory = this._storageProvider
            .getFileStorage()
            .getConfig()
            .getTmpDirectory();
        return tmpDirectory + new Date().valueOf().toString() + '_' + fileName;
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
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }
}
