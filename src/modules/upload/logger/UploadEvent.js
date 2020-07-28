import LogEventInterface from '../../../lib/logger/LogEventInterface';

/**
 * @class UploadEvent
 * @type LogEventInterface
 * @extends LogEventInterface
 */
export default class UploadEvent extends LogEventInterface {
    static TAG = 'upload';

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
        return UploadEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
