/**
 * @class UserProfileUpdateRequestBadData
 * @extends Error
 */
export default class UserProfileUpdateRequestBadData extends Error {
    constructor() {
        super('Bad request: Bad JSON data');
    }
}
