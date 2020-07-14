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
import UserFilesEntity from '../../data/entity/UserFilesEntity';
import UserFilesDefinition from '../../db/definition/UserFilesDefinition';
import DI from '../../lib/di/DI';
import ImageUrl from '../../data/images/ImageUrl';
import DefinitionOrder from '../../lib/db-definition/DefinitionOrder';
import DefinitionLimit from '../../lib/db-definition/DefinitionLimit';

/**
 * @class ImagesGetRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class ImagesGetRequest extends RequestInterface {
    static LIMIT_OFFSET = 10;

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
            const imageData = await this._fetchData(requestData);
            response.setData('files', imageData.images);
            response.setData('limits', imageData.limits);
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

    /**
     *
     * @param {ImagesGetDataClass}requestData
     * @return {Promise<Object>}
     * @private
     */
    async _fetchData(requestData) {
        const limits = new DefinitionLimit(
            requestData.getFromLimit(),
            this._getLimitOffset(requestData.getOffsetLimit())
        );
        return {
            images: await this._fetchImages(requestData, limits),
            limits: {
                from: limits.getFrom(),
                offset: limits.getOffset(),
                count: await this._repository.fetchCount(new UserFilesEntity()),
            }
        };
    }

    /**
     *
     * @param {UserFilesEntity} userFileEntity
     * @return {Promise<void>}
     * @private
     */
    async _extendUserData(userFileEntity) {
        const userId = userFileEntity
            .getValue(UserFilesDefinition.COLUMN_GOOGLE_USER_ID);
        const user = new UserEntity();
        user.setValue(UserDefinition.COLUMN_GOOGLE_ID, userId);
        const userData = await this._usersRepository.fetchData(user);
        const extendUserData = {id: null, name: null, email: null, image: null};
        if (userData.length === 1) {
            extendUserData.id = userData[0]
                .getValue(UserDefinition.COLUMN_GOOGLE_ID);
            extendUserData.name = userData[0]
                .getValue(UserDefinition.COLUMN_GOOGLE_NAME);
            extendUserData.email = userData[0]
                .getValue(UserDefinition.COLUMN_GOOGLE_EMAIL);
            extendUserData.image = userData[0]
                .getValue(UserDefinition.COLUMN_PHOTO_PATH);
        }
        userFileEntity.setValue('user', extendUserData);
    }

    /**
     *
     * @param {UserFilesEntity} userFileEntity
     * @return {string}
     * @private
     */
    _replacePath(userFileEntity) {
        return this._imageUrlProvider.getUrl(userFileEntity);
    }

    /**
     *
     * @param {ImagesGetDataClass} requestData
     * @param {DefinitionLimit} limits
     * @return {Promise<Object<string, string>[]>}
     * @private
     */
    async _fetchImages(requestData, limits) {
        const images = await this._repository.fetchData(
            new UserFilesEntity(),
            new DefinitionOrder(UserFilesDefinition.COLUMN_ID, DefinitionOrder.TYPE_DESC),
            limits
        );
        for (const userFileEntity of images) {
            await this._extendUserData(userFileEntity);
            userFileEntity.unset(UserDefinition.COLUMN_GOOGLE_ID);
            userFileEntity.setValue(
                UserFilesDefinition.COLUMN_PATH,
                this._replacePath(userFileEntity)
            );
        }
        return images.map(imageEntity => imageEntity.getData());
    }

    /**
     * @param {number|null} requestOffset
     * @return {number}
     * @private
     */
    _getLimitOffset(requestOffset = null) {
        return (requestOffset == null)
            ? ImagesGetRequest.LIMIT_OFFSET
            : requestOffset;
    }
}
