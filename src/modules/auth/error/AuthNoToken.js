/**
 * @class AuthNoToken
 */
export default class AuthNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
