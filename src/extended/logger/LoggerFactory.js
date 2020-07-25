import LoggerInterface from '../../lib/logger/LoggerInterface';

/**
 * @class LoggerFactory
 * @extends LoggerInterface
 * @type LoggerInterface
 */
export default class LoggerFactory extends LoggerInterface {
    /**
     *
     * @param {Object<string,LoggerInterface>}loggers
     * @param {LoggerInterface} defaultLogger
     */
    constructor(loggers, defaultLogger) {
        super();
        /**
         *
         * @type {Object<string, LoggerInterface>}
         * @private
         */
        this._loggers = loggers;
        /**
         *
         * @type {LoggerInterface}
         * @private
         */
        this._defaultLogger = defaultLogger;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    debug(logEvent) {
        this._factory(logEvent).debug(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     * @private
     */
    _factory(logEvent) {
        if (this._loggers.hasOwnProperty(logEvent.getTag())) {
            return this._loggers[logEvent.getTag()];
        } else {
            return this._defaultLogger;
        }
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    error(logEvent) {
        this._factory(logEvent).error(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    fatal(logEvent) {
        this._factory(logEvent).fatal(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    info(logEvent) {
        this._factory(logEvent).info(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    trace(logEvent) {
        this._factory(logEvent).trace(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    warn(logEvent) {
        this._factory(logEvent).warn(logEvent);
        return this;
    }
}
