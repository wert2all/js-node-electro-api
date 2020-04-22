/**
 * @class ErrorFileStorageProcessMove
 * @type Error
 * @extends Error
 */
export default class ErrorFileStorageProcessMove extends Error {
    constructor() {
        super('Can\'t move file.');
    }
}
