import ImplementationError from "../implementation-error/ImplementationError";

/**
 * @interface
 * @abstract
 * @class LoggerInterface
 */
export default class LoggerInterface {
    static DEBUG = "debug";
    static TRACE = "trace";
    static INFO = "info";
    static WARN = "warn";
    static ERROR = "error";
    static FATAl = "fatal";

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    trace(logEvent) {
        throw new ImplementationError(this, "trace");
    }

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    debug(logEvent) {
        throw new ImplementationError(this, "debug");
    }

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    info(logEvent) {
        throw new ImplementationError(this, "info");
    }

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    warn(logEvent) {
        throw new ImplementationError(this, "warn");
    }

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    error(logEvent) {
        throw new ImplementationError(this, "error");
    }

    /**
     * @abstract
     * @public
     * @param {LogEventInterface} logEvent
     * @return {LoggerInterface}
     */
    // eslint-disable-next-line no-unused-vars
    fatal(logEvent) {
        throw new ImplementationError(this, "fatal");
    }
}
