/**
 * @class UploadRequestNoYearMon
 * @extends Error
 * @type Error
 */
export default class UploadRequestNoYearMon extends Error {
    constructor() {
        super('Bad request: No yearMon');
    }
}
