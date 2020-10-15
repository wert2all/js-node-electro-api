import ErrorLogEventFactoryInterface from "../../../lib/logger/factory/ErrorLogEventFactoryInterface";
import MLLogsGetLogEvent from "../logs/MLLogsGetLogEvent";

/**
 * @class ErrorLogEventFactory
 * @extends ErrorLogEventFactoryInterface
 * @type ErrorLogEventFactoryInterface
 */
export default class ErrorLogEventFactory extends ErrorLogEventFactoryInterface {
    /**
     *
     * @param {string} message
     * @return LogEventInterface
     */
    factory(message) {
        return new MLLogsGetLogEvent(message);
    }
}
