import StringExt from '../../../lib/utils/StringExt';
import UploadRequestNoToken from '../error/get/UploadRequestNoToken';
import YearMon from '../../../data/YearMon';
import UploadRequestNoYearMon from '../error/get/UploadRequestNoYearMon';

/**
 * @class UploadFilesRequestDataClass
 *
 */
export default class UploadFilesRequestDataClass {
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
    }

    /**
     *
     * @param {YearMon} yearMon
     * @return {UploadFilesRequestDataClass}
     */
    setYearMon(yearMon) {
        this._yearMon = yearMon;
        return this;
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {UploadFilesRequestDataClass}
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
     * @return {GoogleAccount|null}
     */
    getGoogleAccount() {
        return this._account;
    }

    /**
     *
     * @param request
     * @return UploadFilesRequestDataClass
     */
    static factory(request) {
        const authToken = Buffer.from(
            new StringExt(request.query.token)
                .replaceAll('"', ''),
            'base64'
        ).toString();
        if (!authToken) {
            throw new UploadRequestNoToken();
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
            throw new UploadRequestNoYearMon();
        }
        const requestData = new UploadFilesRequestDataClass(authToken);
        requestData.setYearMon(yearMon);
        return requestData;
    }
}
