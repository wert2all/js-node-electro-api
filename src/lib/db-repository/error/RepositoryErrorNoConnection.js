/**
 * @class RepositoryErrorNoConnection
 * @type Error
 * @extends Error
 */
export default class RepositoryErrorNoConnection extends Error {
    constructor() {
        super("No connection");
    }
}
