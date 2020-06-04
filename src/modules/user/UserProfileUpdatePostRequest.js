import RequestInterface from '../../routers/request/RequestInterface';
import UserProfileRepository from '../../db/repository/UserProfileRepository';
import ApiKeyProvider from '../auth/key/KeyProvider';
import AuthCheck from '../auth/AuthCheck';
import AuthParams from '../auth/params/Params';
import ResponseDataClass from '../../routers/response/ResponseDataClass';
import UserProfileUpdateRequestDataClass from './data/UserProfileUpdateRequestDataClass';
import UserEntity from '../../data/entity/UserEntity';
import UserProfileEntity from '../../data/entity/UserProfileEntity';
import EntityManager from '../../lib/db-entity-manager/EntityManager';
import ResponseResult from '../../routers/response/ResponseResult';

/**
 * @class UserProfileUpdatePostRequest
 * @extends RequestInterface
 * @type RequestInterface
 */
export default class UserProfileUpdatePostRequest extends RequestInterface {
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
     *
     * @param {StorageProvider} storageProvider
     * @param {DispatchInterface} dispatcher
     * @return {UserProfileUpdatePostRequest}
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
            const em = new EntityManager(this._storageProvider.getConnection());

            const hash = await this._createProfileHash(requestData.getGoogleAccount());
            const profileEntities = await this._createEntities(requestData, hash);
            profileEntities.map(async entity => {
                await em.save(this._repository.getDefinition(), entity);
            });
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
     * @return {Promise<UserProfileUpdateRequestDataClass>}
     * @private
     */
    async _prepareRequest(request) {
        const requestData = UserProfileUpdateRequestDataClass.factory(request);
        requestData.setGoogleAccount(
            await this._getGoogleAccount(requestData)
        );
        return Promise.resolve(requestData);
    }

    /**
     *
     * @param {UserProfileUpdateRequestDataClass} requestData
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
     * @param {UserProfileUpdateRequestDataClass} requestData
     * @param {Object<string, string>}hash
     * @returns {UserProfileEntity[]}
     * @private
     */
    async _createEntities(requestData, hash) {
        const ret = [];
        const payment = requestData.getPayment();
        ['company_name', 'payment_account', 'bic', 'edrpou', 'personal_number', 'cs']
            .map(valueName => {
                const entity = this._makeEntity(
                    requestData.getGoogleAccount(),
                    valueName,
                    payment.getData(valueName)
                );
                const key = this._createKey(
                    entity.getValue('value_type'),
                    entity.getValue('value_name')
                );
                if (hash.hasOwnProperty(key)) {
                    entity.setValue('id', hash[key]);
                }
                ret.push(entity);
            });
        return ret;
    }

    async _createProfileHash(googleAccount) {
        const userProfile = await this._repository.fetchData(
            this._createCleanProfileEntity(googleAccount)
        );
        return userProfile.reduce((prev, entity) => {
            const key = this._createKey(
                entity.getValue('value_type'),
                entity.getValue('value_name')
            );
            prev[key] = entity.getValue('id');
            return prev;
        }, {});
    }

    /**
     *
     * @param {GoogleAccount} googleAccount
     * @param {string} valueName
     * @param {string} value
     * @returns {UserProfileEntity}
     * @private
     */
    _makeEntity(googleAccount, valueName, value) {
        const userProfileEntity = this._createCleanProfileEntity(googleAccount);

        userProfileEntity.setValue('value_type', 'payment');
        userProfileEntity.setValue('value_name', valueName);
        userProfileEntity.setValue('value', value);

        return userProfileEntity;
    }

    /**
     *
     * @param {GoogleAccount} googleAccount
     * @returns {UserProfileEntity}
     * @private
     */
    _createCleanProfileEntity(googleAccount) {
        const userEntity = new UserEntity()
            .setGoogleAccount(googleAccount);
        const userProfileEntity = new UserProfileEntity();
        userProfileEntity.setUser(userEntity);
        return userProfileEntity;
    }

    /**
     *
     * @param {string} type
     * @param {string} name
     * @returns {string}
     * @private
     */
    _createKey(type, name) {
        return type + ':' + name;
    }
}
