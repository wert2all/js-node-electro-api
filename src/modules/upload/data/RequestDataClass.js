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
