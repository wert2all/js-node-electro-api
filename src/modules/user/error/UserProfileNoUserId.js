/**
 * @class UserProfileNoUserId
 * @extends Error
 */
export default class UserProfileNoUserId extends Error {
    constructor() {
        super('Bad request: No userId');
    }
}
