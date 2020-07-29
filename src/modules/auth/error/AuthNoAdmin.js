/**
 * @class AuthNoAdmin
 */
export default class AuthNoAdmin extends Error {
    constructor() {
        super('Bad request: No admin');
    }
}
