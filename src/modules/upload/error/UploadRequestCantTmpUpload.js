/**
 * @class UploadRequestCantTmpUpload
 * @extends Error
 */
export default class UploadRequestCantTmpUpload extends Error {
    constructor() {
        super("Bad request: Can't upload file to tmp directory.");
    }
}
