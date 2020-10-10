/**
 * @class NoIdError
 * @extends Error
 */
export default class NoIdError extends Error {
    constructor() {
        super("No id");
    }
}
