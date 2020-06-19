import RequestInterface from '../../routers/request/RequestInterface';
import FilesRepository from '../../db/repository/FilesRepository';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import ResponseResult from '../../routers/response/ResponseResult';
import ImagesGetDataClass from './data/ImagesGetDataClass';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import UserRepository from '../../db/repository/UserRepository';
import UserEntity from '../../data/entity/UserEntity';
import UserDefinition from '../../db/definition/UserDefinition';
import ImagesGetNoAdmin from './error/ImagesGetNoAdmin';

/**
 * @class ImagesGetRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class ImagesGetRequest extends RequestInterface {
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
    }

    /**
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {ImagesGetRequest}
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
     * @return {Promise<ResponseResult>}
     * @public
     */
    // eslint-disable-next-line no-unused-vars
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            this._repository.setConnection(this._storageProvider.getConnection());
            this._usersRepository.setConnection(this._storageProvider.getConnection());
            await this._checkAdmin(requestData);
            // const userData = await this._fetchUserData(requestData);
            response.setData('dump', requestData);
            response.setStatus(true);
        } catch (e) {
            console.log(e);
            response.setStatus(false);
            response.setMessage(e.message);
        }

        return Promise.resolve(
            new ResponseResult(ResponseResult.TYPE_JSON, response.getData())
        );
    }

    /**
     *
     * @param request
     * @return {Promise<ImagesGetDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = ImagesGetDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {ImagesGetDataClass} requestData
     * @return {GoogleAccount}
     * @private
     */
    async _getGoogleAccount(requestData) {
        const apiKey = new ApiKeyProvider(
            this._storageProvider,
            'google:api:signin:client:key'
        )
            .get();
        return await new AuthCheck(apiKey)
            .check(
                new AuthParams(requestData.getToken())
            );
    }

    /**
     *
     * @param {ImagesGetDataClass} requestData
     * @private
     */
    async _checkAdmin(requestData) {
        let isAdmin = false;
        const userEntity = new UserEntity();
        userEntity.setValue(
            UserDefinition.COLUMN_GOOGLE_ID,
            requestData.getAccount().getGoogleUserId()
        );
        const users = await this._usersRepository.fetchData(userEntity);
        if (users.length === 1) {
            isAdmin = users[0].getIsAdmin() === 'y';
        }
        if (isAdmin === false) {
            throw new ImagesGetNoAdmin();
        }
    }
}
