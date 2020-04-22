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
            const repository = new FilesRepository(this.storageProvider.getConnection());
            /**
             * @type {EntityInterface[]}
             */
            const userFileList = await repository.fetchData(userFiles);
            if (userFileList.length === 0) {
                await this._saveFile(requestData.billFile.data, fileData, userFiles);
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
        const apiKey = new ApiKeyProvider(this.storageProvider).get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.token)
            );
    }

    /**
     *
     * @param {{mv:function(string, function)}} fileObj
     * @param {FileData} fileData
     * @param {UserFilesEntity} userFiles
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    async _saveFile(fileObj, fileData, userFiles) {
        //TODO
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
         */
        this.storageProvider = storageProvider;
        return this;
    }
}
