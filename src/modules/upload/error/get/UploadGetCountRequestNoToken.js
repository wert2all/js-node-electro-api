export default class UploadGetCountRequestNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
