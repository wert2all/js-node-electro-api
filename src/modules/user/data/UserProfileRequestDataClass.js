/**
 * @class UserProfileRequestDataClass
 *
 */
import StringExt from '../../../lib/utils/StringExt';
import UserProfileRequestNoToken from '../error/UserProfileRequestNoToken';

export default class UserProfileRequestDataClass {
    constructor(authToken) {
        this.token = authToken;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {UserProfileRequestDataClass}
     */
    setGoogleAccount(account) {
        /**
         *
         * @type {string}
         * @private
         */
        this._account = account;
        return this;
    }

    /**
     *
     * @return {GoogleAccount|null}
     */
    getGoogleAccount() {
        return this._account;
    }

    /**
     *
     * @param request
     * @return UserProfileRequestDataClass
     */
    static factory(request) {
        const authToken = Buffer.from(
            new StringExt(request.query.token)
                .replaceAll('"', ''),
            'base64'
        ).toString();
        if (!authToken) {
            throw new UserProfileRequestNoToken();
        }

        return new UserProfileRequestDataClass(authToken);
    }
}
