import LoggerInterface from '../../lib/logger/LoggerInterface';

/**
 * @class Logger
 * @extends LoggerInterface
 * @type LoggerInterface
 */
export default class Logger extends LoggerInterface {
    /**
     *
     * @param {LoggerStrategy} strategy
     */
    constructor(strategy) {
        super();
        /**
         *
         * @type {LoggerStrategy}
         * @private
         */
        this._strategy = strategy;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    debug(logEvent) {
        this._strategy
            .get(logEvent)
            .debug(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    error(logEvent) {
        this._strategy.get(logEvent).error(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    fatal(logEvent) {
        this._strategy.get(logEvent).fatal(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    info(logEvent) {
        this._strategy.get(logEvent).info(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    trace(logEvent) {
        this._strategy.get(logEvent).trace(logEvent);
        return this;
    }

    /**
     *
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    warn(logEvent) {
        this._strategy.get(logEvent).warn(logEvent);
        return this;
    }
}
