/**
 * @class UploadRequestBadMime
 */
export default class UploadRequestBadMime extends Error {
    constructor() {
        super("Bad file type");
    }
}
