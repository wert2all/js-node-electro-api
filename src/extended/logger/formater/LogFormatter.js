import LogFormatterInterface from '../../../lib/logger/LogFormatterInterface';

/**
 * @class LogFormatter
 * @extends LogFormatterInterface
 * @type LogFormatterInterface
 */
export default class LogFormatter extends LogFormatterInterface {
    /**
     *
     * @param {string} delimiter
     */
    constructor(delimiter) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._delimiter = delimiter;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @param {string} level
     * @return {string}
     */
    format(logEvent, level) {
        return [
            logEvent.getTime().toISOString().substring(0, 10),
            logEvent.getTag(),
            level,
            logEvent.getMessage()
        ].join(this._delimiter);
    }
}

