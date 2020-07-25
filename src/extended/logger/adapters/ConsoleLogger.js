import LoggerInterface from '../../../lib/logger/LoggerInterface';

/**
 * @class ConsoleLogger
 * @extends LoggerInterface
 * @type LoggerInterface
 */
export default class ConsoleLogger extends LoggerInterface {
    /**
     *
     * @param {LogFormatterInterface} formatter
     */
    constructor(formatter) {
        super();
        /**
         *
         * @type {LogFormatterInterface}
         * @private
         */
        this._formatter = formatter;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    debug(logEvent) {
        console.debug(this._formatter.format(logEvent, LoggerInterface.DEBUG));
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    error(logEvent) {
        console.error(this._formatter.format(logEvent, LoggerInterface.ERROR));
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    fatal(logEvent) {
        console.error(this._formatter.format(logEvent, LoggerInterface.FATAl));
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    info(logEvent) {
        console.info(this._formatter.format(logEvent, LoggerInterface.INFO));
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    trace(logEvent) {
        console.trace(this._formatter.format(logEvent, LoggerInterface.TRACE));
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {ConsoleLogger}
     */
    warn(logEvent) {
        console.warn(this._formatter.format(logEvent, LoggerInterface.WARN));
        return this;
    }
}
