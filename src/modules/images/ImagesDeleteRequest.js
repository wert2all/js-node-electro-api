import RequestInterface from '../../routers/request/RequestInterface';
import FilesRepository from '../../db/repository/FilesRepository';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import ResponseResult from '../../routers/response/ResponseResult';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import UserRepository from '../../db/repository/UserRepository';
import UserEntity from '../../data/entity/UserEntity';
import UserDefinition from '../../db/definition/UserDefinition';
import ImagesGetNoAdmin from './error/ImagesGetNoAdmin';
import DI from '../../lib/di/DI';
import ImageUrl from '../../data/images/ImageUrl';
import ConnectionInterface from '../../lib/db-connection/ConnectionInterface';
import StorageConfiguration from '../../storage/configuration/StorageConfiguration';
import ImagesDeleteDataClass from './data/ImagesDeleteDataClass';

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
         * @type {ImageUrl}
         * @private
         */
        this._imageUrlProvider = DI.getInstance().get(ImageUrl);
    }

    /**
     *
     * @param {DispatchInterface} dispatcher
     * @return {ImagesDeleteRequest}
     */
    // eslint-disable-next-line no-unused-vars
    init(dispatcher) {
        this._repository.setConnection(DI.getInstance().get(ConnectionInterface));
        this._usersRepository.setConnection(DI.getInstance().get(ConnectionInterface));
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
     * @return {Promise<ImagesDeleteDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = ImagesDeleteDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
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
            DI.getInstance()
                .get(StorageConfiguration)
                .getSecretStorage(),
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
     * @param {ImagesDeleteDataClass} requestData
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
