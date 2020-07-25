import LogEventInterface from '../../../lib/logger/LogEventInterface';

/**
 * @class ImageLogEvent
 * @type LogEventInterface
 * @extends LogEventInterface
 */
export default class ImageLogEvent extends LogEventInterface {
    static  TAG = 'imagelist';

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
        return ImageLogEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
