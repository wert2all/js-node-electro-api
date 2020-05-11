export default class UserProfileRequestNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
