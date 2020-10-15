import LogEventInterface from "../../../lib/logger/LogEventInterface";

/**
 * @class MLLogsGetLogEvent
 * @extends LogEventInterface
 * @type LogEventInterface
 */
export default class MLLogsGetLogEvent extends LogEventInterface {
    static TAG = "ml_log_list";

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
        return MLLogsGetLogEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
