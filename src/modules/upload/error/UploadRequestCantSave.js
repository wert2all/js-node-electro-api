/**
 * @class UploadRequestCantSave
 * @extends Error
 */
export default class UploadRequestCantSave extends Error {
    constructor() {
        super('Can\'t save data');
    }
}
