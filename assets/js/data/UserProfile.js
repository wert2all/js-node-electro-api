/**
 * @class UserProfile
 */
export default class UserProfile {
    constructor() {
        /**
         *
         * @type {string}
         * @private
         */
        this._personalNumber = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._cs = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._companyName = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._iban = "";
        /**
         *
         * @type {string}
         * @private
         */
        this._bic = "";
    }

    /**
     *
     * @param {ApiFetchResult} response
     * @return UserProfile|null
     */
    // eslint-disable-next-line max-statements
    static factory(response) {
        if (response.getStatus()) {
            const data = response.getData();
            const profile = new UserProfile();
            if (data.hasOwnProperty("payment")) {
                if (data.payment.hasOwnProperty("personal_number")) {
                    profile.setPersonalNumber(data.payment.personal_number);
                }
                if (data.payment.hasOwnProperty("cs")) {
                    profile.setCs(data.payment.cs);
                }
                if (data.payment.hasOwnProperty("company_name")) {
                    profile.setCompanyName(data.payment.company_name);
                }
                if (data.payment.hasOwnProperty("iban")) {
                    profile.setIban(data.payment.iban);
                }
                if (data.payment.hasOwnProperty("edrpou")) {
                    profile.setBic(data.payment.edrpou);
                }
            }
            return profile;
        }
        return null;
    }

    /**
     *
     * @return {string}
     */
    getBic() {
        return this._bic;
    }

    /**
     *
     * @param {string} value
     */
    setBic(value) {
        this._bic = value;
    }

    /**
     *
     * @return {string}
     */
    getIban() {
        return this._iban;
    }

    /**
     *
     * @param {string} value
     */
    setIban(value) {
        this._iban = value;
    }

    /**
     *
     * @return {string}
     */
    getCompanyName() {
        return this._companyName;
    }

    /**
     *
     * @param {string} value
     */
    setCompanyName(value) {
        this._companyName = value;
    }

    /**
     *
     * @return {string}
     */
    getCs() {
        return this._cs;
    }

    /**
     *
     * @param {string} value
     */
    setCs(value) {
        this._cs = value;
    }

    /**
     *
     * @return {string}
     */
    getPersonalNumber() {
        return this._personalNumber;
    }

    /**
     *
     * @param {string} value
     */
    setPersonalNumber(value) {
        this._personalNumber = value;
    }
}
