'use strict';
import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from './data/ResponseDataClass';
import RequestDataClass from './data/RequestDataClass';
import AuthCheck from '../auth/AuthCheck';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthParams from '../auth/params/Params';
import YearMon from '../../data/YearMon';
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

/**
 * @class UploadRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UploadRequest extends RequestInterface {

    /**
     * @request {*} request
     * @return {Promise}
     * @public
     * @abstract
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = RequestDataClass.factory(request);
            const googleUserAccount = await this._getGoogleAccount(requestData);

            const fileData = await this._getFileData(requestData);
            const userFiles = this.makeUserFilesEntity(googleUserAccount);
            const repository = new FilesRepository(this._storageProvider.getConnection());
            /**
             * @type {EntityInterface[]}
             */
            const userFileList = await repository.fetchData(userFiles);
            if (userFileList.length === 0) {
                fileData.setPath(
                    await this._moveFileToTmpDirectory(
                        requestData.billFile,
                        fileData.getName()
                    )
                );
                await this._saveFile(fileData, userFiles);
            }
            response.dump = fileData;
            response.status = true;
        } catch (e) {
            response.dump = e;
            response.status = false;
            response.message = e.message;
        }
        return Promise.resolve(response.toHash());
    }

    makeUserFilesEntity(googleUserAccount) {
        const userEntity = new UserEntity()
            .setGoogleAccount(googleUserAccount);
        return new UserFilesEntity()
            .setUser(userEntity)
            .setYearMon(new YearMon());
    }

    /**
     *
     * @param {RequestDataClass} requestData
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
        //TODO
        fileData = await this._storageProvider.getFileStorage()
            .moveFile(fileData, new ImageFileNameProvider());
    }

    /**
     *
     * @param {RequestDataClass} requestData
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
        );
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @return {UploadRequest}
     */
    init(storageProvider) {
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @return {string}
     * @private
     */
    _getTmpFilePath(fileName) {
        const tmpDirectory = this._storageProvider.getFileStorage().getTmpDirectory();
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
}
