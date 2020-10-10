import LogEventInterface from "../../../lib/logger/LogEventInterface";

export default class AppLogEvent extends LogEventInterface {
    static TAG = "APP";

    /**
     *
     * @param {string} message
     */
    constructor(message) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._message = message;
    }

    /**
     *
     * @return {string}
     */
    getMessage() {
        return this._message;
    }

    /**
     *
     * @return {string}
     */
    getTag() {
        return AppLogEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
