export default class UploadRequestNoFiles extends Error {
    constructor() {
        super('Bad request: No files');
    }
}
