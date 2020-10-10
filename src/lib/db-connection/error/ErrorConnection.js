/**
 * @class ErrorConnection
 * @extends Error
 */
export default class ErrorConnection extends Error {
    constructor() {
        super("Can't exec query.");
    }
}
