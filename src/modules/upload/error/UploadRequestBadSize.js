export default class UploadRequestBadSize extends Error {
    constructor() {
        super("Bad file size (more 10Mb)");
    }
}
