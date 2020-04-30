'use strict';

import UploadRequestNoToken from '../error/UploadRequestNoToken';
import UploadRequestNoFiles from '../error/UploadRequestNoFiles';
import YearMon from '../../../data/YearMon';

/**
 * @class RequestDataClass
 *
 */
export default class RequestDataClass {
    constructor(authToken, billFile) {
        this.token = authToken;
        this.billFile = billFile;
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
     * @param {GoogleAccount} account
     * @return {RequestDataClass}
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
     * @param {YearMon} yearmon
     * @return {RequestDataClass}
     */
    setYearMon(yearmon) {
        this._yearMon = yearmon;
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
     * @param request
     * @return {RequestDataClass}
     */
    static factory(request) {
        console.log(request.body);
        const authToken = Buffer.from(
            request.body.token.replace('"', ''), 'base64'
        ).toString();
        if (!authToken) {
            throw new UploadRequestNoToken();
        }

        if (!request.files) {
            throw new UploadRequestNoFiles();
        }
        if (!request.files.images) {
            throw new UploadRequestNoFiles();
        }
        console.log(request.files)
        console.log(request.files.images)
        const requestData = new RequestDataClass(authToken, request.files.images);
        if (request.body.yearmon) {
            const yearMon = YearMon.create(request.body.yearmon.replace('"', ''));
            if (yearMon != null) {
                requestData.setYearMon(yearMon);
            }
        }
        console.log( requestData )
        return requestData;
    }
}
