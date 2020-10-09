"use strict";

import UploadRequestNoToken from "../error/UploadRequestNoToken";
import UploadRequestNoFiles from "../error/UploadRequestNoFiles";
import YearMon from "../../../data/YearMon";
import StringExt from "../../../lib/utils/StringExt";

/**
 * @class UploadRequestDataClass
 *
 */
export default class UploadRequestDataClass {
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
        /**
         *
         * @type {string}
         * @private
         */
        this._type = "bill";
    }

    /**
     *
     * @param {GoogleAccount} account
     * @return {UploadRequestDataClass}
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
     * @return {UploadRequestDataClass}
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
     * @param {string} type
     * @return {UploadRequestDataClass}
     */
    setType(type) {
        this._type = type;
        return this;
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
     * @return {UploadRequestDataClass}
     */
    // eslint-disable-next-line max-statements
    static factory(request) {
        const authToken = Buffer.from(new StringExt(request.body.token).replaceAll('"', ""), "base64").toString();
        if (!authToken) {
            throw new UploadRequestNoToken();
        }

        if (!request.files) {
            throw new UploadRequestNoFiles();
        }
        if (!request.files.images) {
            throw new UploadRequestNoFiles();
        }

        const requestData = new UploadRequestDataClass(authToken, request.files.images);
        if (request.body.yearmon) {
            const yearMon = YearMon.create(new StringExt(request.body.yearmon).replaceAll('"', ""));
            if (yearMon != null) {
                requestData.setYearMon(yearMon);
            }
        }
        if (request.body.type) {
            requestData.setType(
                new StringExt(request.body.type).replaceAll('"', "").toLowerCase() === "meter" ? "meter" : "bill"
            );
        }
        return requestData;
    }
}
