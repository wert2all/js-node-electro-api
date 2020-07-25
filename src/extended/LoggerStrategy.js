/**
 * @class LoggerStrategy
 */
export default class LoggerStrategy {
    /**
     *
     * @param {Object<string,LoggerInterface>}loggers
     * @param {LoggerInterface} defaultLogger
     */
    constructor(loggers, defaultLogger) {
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
    get(logEvent) {
        if (this._loggers.hasOwnProperty(logEvent.getTag())) {
            return this._loggers[logEvent.getTag()];
        } else {
            return this._defaultLogger;
        }
    }

    /**
     *
     * @param {string} tag
     * @param {LoggerInterface} logger
     * @return LoggerStrategy
     */
    addLogger(tag, logger) {
        const loggers = this._loggers;
        loggers[tag] = logger;
        return new LoggerStrategy(loggers, this._defaultLogger);
    }
}
