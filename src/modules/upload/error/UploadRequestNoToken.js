/**
 * @class UploadRequestNoToken
 * @type Error
 */
export default class UploadRequestNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
