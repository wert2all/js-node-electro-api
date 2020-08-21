import LogEventInterface from '../../../../lib/logger/LogEventInterface';

export default class ImageListLogEvent extends LogEventInterface {
    static TAG = 'image_list';

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
        return ImageListLogEvent.TAG;
    }

    /**
     *
     * @return {Date}
     */
    getTime() {
        return new Date();
    }
}
