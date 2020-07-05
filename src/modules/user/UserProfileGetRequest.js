import RequestInterface from '../../routers/request/RequestInterface';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import UserPaymentDataClass from './data/UserPaymentDataClass';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import UserProfileRequestDataClass from './data/UserProfileRequestDataClass';
import UserProfileRepository from '../../db/repository/UserProfileRepository';
import UserProfileEntity from '../../data/entity/UserProfileEntity';
import UserEntity from '../../data/entity/UserEntity';
import UserProfileDefinition from '../../db/definition/UserProfileDefinition';
import ResponseResult from '../../routers/response/ResponseResult';

/**
 * @class UserProfileGetRequest
 * @type RequestInterface
 * @extends RequestInterface
 */
export default class UserProfileGetRequest extends RequestInterface {
    constructor() {
        super();
        /**
         *
         * @type {UserProfileRepository}
         * @private
         */
        this._repository = new UserProfileRepository();
    }

    /**
     * @request {*} request
     * @return {Promise<ResponseDataClass>}
     * @public
     */
    async createResponse(request) {
        const response = new ResponseDataClass();
        try {
            const requestData = await this._prepareRequest(request);
            this._repository.setConnection(this._storageProvider.getConnection());
            const userProfileList = await this._fetchUserProfile(requestData);
            const ret = this._convertToResponseData(userProfileList);
            if (ret !== null) {
                response.setData('payment', ret.payment.toHash());
            }
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
     * @return {Promise<UploadGetCountRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UserProfileRequestDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UserProfileRequestDataClass} requestData
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
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {UserProfileGetRequest}
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
     *
     * @param {UploadGetCountRequestDataClass} requestData
     * @returns {Promise<EntityInterface[]>}
     * @private
     */
    async _fetchUserProfile(requestData) {
        const userEntity = new UserEntity()
            .setGoogleAccount(requestData.getGoogleAccount());
        const userProfileEntity = new UserProfileEntity();
        userProfileEntity.setUser(userEntity);
        return Promise.resolve(this._repository.fetchData(userProfileEntity));
    }

    /**
     *
     * @param {EntityInterface[]} userProfileList
     * @returns {{"payment":  UserPaymentDataClass}|null}
     * @private
     */
    _convertToResponseData(userProfileList) {
        let ret = null;
        if (userProfileList.length > 0) {
            ret = {
                'payment': new UserPaymentDataClass()
            };
            userProfileList.map(profileValue => {
                const profileDataHash = profileValue.getData();
                if (
                    profileDataHash[UserProfileDefinition.COLUMN_VALUE_TYPE] === 'payment'
                ) {
                    ret.payment
                        .setData(
                            profileDataHash[UserProfileDefinition.COLUMN_VALUE_NAME],
                            profileDataHash[UserProfileDefinition.COLUMN_VALUE_VALUE]
                        );
                }
            });
        }

        return ret;
    }
}
