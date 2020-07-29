import UserProfileNoUserId from '../error/UserProfileNoUserId';
import UserEntity from '../../../data/entity/UserEntity';
import UserDefinition from '../../../db/definition/UserDefinition';
import UserProfileEntity from '../../../data/entity/UserProfileEntity';
import UserPaymentDataClass from '../data/UserPaymentDataClass';
import UserProfileDefinition from '../../../db/definition/UserProfileDefinition';

export default class UserProfileFetchModel {
    /**
     *
     * @param {UserProfileRepository} repository
     */
    constructor(repository) {
        /**
         *
         * @type {UserProfileRepository}
         * @private
         */
        this._repository = repository;
    }

    /**
     *
     * @param {ResponseDataClass} response
     * @param {UserProfileRequestDataClass} requestData
     * @return {Promise<ResponseDataClass>}
     */
    async extendResponseUserProfile(response, requestData) {
        const userProfileList = await this._fetchUserProfile(
            requestData.getGoogleUserId()
        );
        const ret = this._convertToResponseData(userProfileList);
        if (ret !== null) {
            response.setData('payment', ret.payment.toHash());
        }
        return Promise.resolve(response);
    }

    /**
     *
     * @returns {Promise<EntityInterface[]>}
     * @private
     * @param {string|null} googleUserId
     */
    async _fetchUserProfile(googleUserId) {
        if (googleUserId == null) {
            return Promise.reject(new UserProfileNoUserId());
        }
        const userEntity = new UserEntity()
            .setValue(UserDefinition.COLUMN_GOOGLE_ID, googleUserId);
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
