/**
 * @class UserProfileRequestDataClass
 *
 */
import StringExt from '../../../lib/utils/StringExt';
import AuthNoToken from '../../auth/error/AuthNoToken';

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
            throw new AuthNoToken();
        }

        return new UserProfileRequestDataClass(authToken);
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
}
