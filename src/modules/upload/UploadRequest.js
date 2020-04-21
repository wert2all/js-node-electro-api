'use strict';
import RequestInterface from '../../request/RequestInterface';
import ResponseDataClass from './data/ResponseDataClass';
import RequestDataClass from './data/RequestDataClass';
import AuthCheck from '../auth/AuthCheck';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthParams from '../auth/params/Params';
import YearMon from '../../data/YearMon';
import UserEntity from '../../data/entity/UserEntity';
import UserFilesEntity from '../../data/entity/UserFilesEntity';
import FilesRepository from '../../db/repository/FilesRepository';

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
            requestData.googleUserID = googleUserAccount.getGoogleUserId();

            const yearMon = new YearMon();
            const userEntity = new UserEntity()
                .setGoogleAccount(googleUserAccount);
            const userFiles = new UserFilesEntity()
                .setUser(userEntity)
                .setYearMon(yearMon);
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
    async _saveFile(requestData, userFiles) {
        //TODO
    }
}
