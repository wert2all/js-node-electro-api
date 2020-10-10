export default class ImplementationError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}
