export default class BillCountRequestNoToken extends Error {
    constructor() {
        super('Bad request: No token');
    }
}
