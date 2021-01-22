/**
 * @interface
 * @class ImplementationErrorInterface
 */
export default class ImplementationErrorInterface extends Error {
    /**
     *
     * @param {string} message
     */
    constructor(message) {
        super();
        /**
         *
         * @type {string}
         */
        this.message = message;
    }
}
