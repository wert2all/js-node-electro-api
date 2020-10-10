/**
 * @class ErrorFileStorageProcessType
 * @type Error
 * @extends Error
 */
export default class ErrorFileStorageProcessType extends Error {
    constructor() {
        super("Can't process file.");
    }
}
