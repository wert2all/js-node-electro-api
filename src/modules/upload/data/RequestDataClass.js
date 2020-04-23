'use strict';

import UploadRequestNoToken from '../error/UploadRequestNoToken';
import UploadRequestNoFiles from '../error/UploadRequestNoFiles';

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
         * @type {string|null}
         * @private
         */
        this._account = null;
    }

    /**
     *
     * @param {string} account
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
     * @return {string|null}
     */
    getGoogleAccount() {
        return this._account;
    }

    /**
     *
     * @param request
     * @return {RequestDataClass}
     */
    static factory(request) {
        const authToken = request.body.token;
        if (!authToken) {
            throw new UploadRequestNoToken();
        }

        if (!request.files) {
            throw new UploadRequestNoFiles();
        }
        if (!request.files.bill) {
            throw new UploadRequestNoFiles();
        }

        return new RequestDataClass(authToken, request.files.bill);
    }
}
