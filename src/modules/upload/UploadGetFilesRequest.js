import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import FilesRepository from '../../db/repository/FilesRepository';
import UserEntity from '../../data/entity/UserEntity';
import UserFilesEntity from '../../data/entity/UserFilesEntity';
import UploadFilesRequestDataClass from './data/UploadFilesRequestDataClass';

/**
 * @class UploadGetFilesRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UploadGetFilesRequest extends RequestInterface {
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
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {UploadGetFilesRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(storageProvider, dispatcher) {
        /**
         *
         * @type {StorageProvider}
         * @private
         */
        this._storageProvider = storageProvider;
        return this;
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            this._repository.setConnection(this._storageProvider.getConnection());
            const userData = await this._fetchUserData(requestData);
            response.setData('counts', this._groupData(userData));
            response.setStatus(true);
        } catch (e) {
            console.log(e);
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(response.toHash());
    }

    /**
     *
     * @param request
     * @return {Promise<UploadFilesRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UploadFilesRequestDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UploadFilesRequestDataClass} requestData
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
     * @param {UploadFilesRequestDataClass} requestData
     * @returns {Promise<EntityInterface[]>}
     * @private
     */
    async _fetchUserData(requestData) {
        const userEntity = new UserEntity()
            .setGoogleAccount(requestData.getGoogleAccount());
        const userFilesEntity = new UserFilesEntity()
            .setUser(userEntity)
            .setYearMon(requestData.getYearMon());
        return Promise.resolve(this._repository.fetchData(userFilesEntity));
    }

    /**
     *
     * @param {UserFilesEntity[]}userData
     * @returns {{meter: number, bill: number}}
     * @private
     */
    _groupData(userData) {
        const ret = {
            bill: 0,
            meter: 0
        };
        userData.forEach(fileData => {
            if (ret.hasOwnProperty(fileData.getValue('type'))) {
                ret[fileData.getValue('type')]++;
            }
        });
        return ret;
    }
}
