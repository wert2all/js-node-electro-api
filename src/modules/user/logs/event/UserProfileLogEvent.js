import LogEventInterface from "../../../../lib/logger/LogEventInterface";

/**
 * @class UserProfileLogEvent
 * @type LogEventInterface
 * @extends LogEventInterface
 */
export default class UserProfileLogEvent extends LogEventInterface {
    static TAG = "user_profile";

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
        return UserProfileLogEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
