import StringExt from '../../../lib/utils/StringExt';
import UploadGetCountRequestNoToken from '../error/get/UploadGetCountRequestNoToken';
import YearMon from '../../../data/YearMon';
import UploadGetCountRequestNoYearMon from '../error/get/UploadGetCountRequestNoYearMon';

/**
 * @class UploadGetCountRequestDataClass
 *
 */
export default class UploadGetCountRequestDataClass {
    constructor(authToken) {
        this.token = authToken;
        /**
         *
         * @type {GoogleAccount|null}
         * @private
         */
        this._account = null;
        /**
         *
         * @type {YearMon}
         * @private
         */
        this._yearMon = new YearMon();
        /**
         *
         * @type {string}
         * @private
         */
        this._type = 'bill';
    }

    /**
     *
     * @param {YearMon} yearMon
     * @return {UploadGetCountRequestDataClass}
     */
    setYearMon(yearMon) {
        this._yearMon = yearMon;
        return this;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {UploadGetCountRequestDataClass}
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
     * @return {YearMon}
     */
    getYearMon() {
        return this._yearMon;
    }

    /**
     *
     * @param {string} type
     * @return {UploadGetCountRequestDataClass}
     */
    setType(type) {
        this._type = type;
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
     * @return {string}
     */
    getType() {
        return this._type;
    }

    /**
     *
     * @param request
     * @return UploadGetCountRequestDataClass
     */
    static factory(request) {
        const authToken = Buffer.from(
            new StringExt(request.query.token)
                .replaceAll('"', ''),
            'base64'
        ).toString();
        if (!authToken) {
            throw new UploadGetCountRequestNoToken();
        }
        /**
         *
         * @type {YearMon|null}
         */
        let yearMon = null;
        if (request.query.yearmon) {
            yearMon = YearMon.create(
                new StringExt(request.query.yearmon)
                    .replaceAll('"', '')
            );
        }
        if (yearMon == null) {
            throw new UploadGetCountRequestNoYearMon();
        }
        const requestData = new UploadGetCountRequestDataClass(authToken);
        requestData.setYearMon(yearMon);
        if (request.query.type) {
            requestData.setType(
                (new StringExt(request.query.type).replaceAll('"', '') === 'meter')
                    ? 'meter'
                    : 'bill'
            );
        }

        return requestData;
    }
}
