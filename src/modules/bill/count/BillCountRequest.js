import RequestInterface from '../../../routers/request/RequestInterface';
import ResponseDataClass from '../../../routers/response/ResponseDataClass';
import ApiKeyProvider from '../../auth/key/KeyProvider';
import AuthCheck from '../../auth/AuthCheck';
import AuthParams from '../../auth/params/Params';
import BillRequestDataClass from './data/BillRequestDataClass';
import EntityManager from '../../../lib/db-entity-manager/EntityManager';
import FilesRepository from '../../../db/repository/FilesRepository';
import UserEntity from '../../../data/entity/UserEntity';
import UserFilesEntity from '../../../data/entity/UserFilesEntity';

/**
 * @class BillCountRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class BillCountRequest extends RequestInterface {
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
     * @return {BillCountRequest}
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
            response.setData('request', requestData);
            response.setData('files', userData);
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
     * @return {Promise<BillRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = BillRequestDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {BillRequestDataClass} requestData
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
     * @param {BillRequestDataClass} requestData
     * @returns {Promise<EntityInterface[]>}
     * @private
     */
    async _fetchUserData(requestData) {
        const userEntity = new UserEntity()
            .setGoogleAccount(requestData.getGoogleAccount());
        const userFilesEntity = new UserFilesEntity()
            .setUser(userEntity)
            .setType(requestData.getType())
            .setYearMon(requestData.getYearMon());
        console.log(await this._repository.fetchData(userFilesEntity));
        return Promise.resolve(this._repository.fetchData(userFilesEntity));
    }
}
