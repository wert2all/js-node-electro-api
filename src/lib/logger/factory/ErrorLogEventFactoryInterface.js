/**
 * @interface
 * @abstract
 * @class ErrorLogEventFactoryInterface
 */
export default class ErrorLogEventFactoryInterface {
    /**
     * @abstract
     * @param {string} message
     * @return LogEventInterface
     */
    factory(message) {}
}
