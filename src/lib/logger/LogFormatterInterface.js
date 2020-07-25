import ImplementationError from '../implementation-error/ImplementationError';

/**
 * @interface
 * @abstract
 * @class LogFormatterInterface
 */
export default class LogFormatterInterface {
    /**
     * @abstract
     * @param {LogEventInterface} logEvent
     * @param {string} level
     * @return {string}
     */
    // eslint-disable-next-line no-unused-vars
    format(logEvent, level) {
        throw new ImplementationError(this, 'format');
    }
}
