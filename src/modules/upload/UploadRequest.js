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

/**
 * @class UploadRequest
 * @type RequestInterface
 */
export default class UploadRequest extends RequestInterface {

    /**
     *
     * @param {StorageProvider} storageProvider
     */
    constructor(storageProvider) {
        super();
        /**
         *
         * @type {StorageProvider}
         */
        this.storageProvider = storageProvider;
    }

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

            await this._checkFile(requestData);
            const userFiles = this.makeUserFilesEntity(googleUserAccount);
            const repository = new FilesRepository(this.storageProvider.getConnection());
            /**
             * @type {EntityInterface[]}
             */
            const userFileList = await repository.fetchData(userFiles);
            if (userFileList.length === 0) {
                await this._saveFile(requestData, userFiles);
            }

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
     * @param {RequestDataClass} requestData
     * @param {UserFilesEntity} userFiles
     * @private
     */
    // eslint-disable-next-line no-unused-vars
    async _saveFile(requestData, userFiles) {
        //TODO
    }

    /**
     *
     * @param {RequestDataClass} requestData
     * @return {Promise<void>}
     * @private
     */
    async _checkFile(requestData) {
        if (!requestData.billFile.hasOwnProperty('mimetype')
            || requestData.billFile.mimetype !== 'image/jpeg'
        ) {
            return Promise.reject(new UploadRequestBadMime());
        }
        if (!requestData.billFile.hasOwnProperty(('size'))
            || requestData.billFile.size > 5242880
        ) {
            return Promise.reject(new UploadRequestBadSize());
        }
    }
}
