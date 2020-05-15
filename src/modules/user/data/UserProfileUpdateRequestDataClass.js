/**
 * @class UserProfileUpdateRequestDataClass
 *
 */
import StringExt from '../../../lib/utils/StringExt';
import UserProfileRequestNoToken from '../error/UserProfileRequestNoToken';
import UserProfileUpdateRequestBadData from '../error/UserProfileUpdateRequestBadData';
import UserPaymentDataClass from './UserPaymentDataClass';

export default class UserProfileUpdateRequestDataClass {
    /**
     *
     * @param {string} authToken
     * @param {UserPaymentDataClass} paymentData
     */
    constructor(authToken, paymentData) {
        this.token = authToken;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
        /**
         *
         * @type {UserPaymentDataClass}
         * @private
         */
        this._paymentData = paymentData;
    }

    /**
     *
     * @returns {UserPaymentDataClass}
     */
    getPayment() {
        return this._paymentData;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {UserProfileUpdateRequestDataClass}
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
     * @return UserProfileUpdateRequestDataClass
     */
    static factory(request) {
        // eslint-disable-next-line max-statements
        const _createPayment = profileData => {
            const paymentData = new UserPaymentDataClass();
            if (profileData.hasOwnProperty('payment')) {
                const payment = profileData.payment;
                if (payment.hasOwnProperty('company_name')) {
                    paymentData.setData('company_name', payment.company_name);
                }
                if (payment.hasOwnProperty('payment_account')) {
                    paymentData.setData('payment_account', payment.payment_account);
                }
                if (payment.hasOwnProperty('edrpou')) {
                    paymentData.setData('edrpou', payment.edrpou);
                }
                if (payment.hasOwnProperty('bic')) {
                    paymentData.setData('bic', payment.bic);
                }
                if (payment.hasOwnProperty('personal_number')) {
                    paymentData.setData('personal_number', payment.personal_number);
                }
                if (payment.hasOwnProperty('cs')) {
                    paymentData.setData('cs', payment.cs);
                }
            }
            return paymentData;
        };

        const authToken = Buffer.from(
            new StringExt(request.body.token)
                .replaceAll('"', ''),
            'base64'
        ).toString();
        if (!authToken) {
            throw new UserProfileRequestNoToken();
        }
        let profileData = null;
        try {
            profileData = JSON.parse(request.body.data);
        } catch (e) {
            throw new UserProfileUpdateRequestBadData();
        }

        return new UserProfileUpdateRequestDataClass(
            authToken,
            _createPayment(profileData)
        );
    }
}