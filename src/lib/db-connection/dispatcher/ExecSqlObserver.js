import ObserverInterface from "../../dispatcher/ObserverInterface";
import SQLLogEvent from "../../../extended/logger/events/SQLLogEvent";

/**
 * @class ExecSqlObserver
 * @export ObserverInterface
 * @type ObserverInterface
 */
export default class ExecSqlObserver extends ObserverInterface {
    /**
     *
     * @param {LoggerInterface} logger
     */
    constructor(logger) {
        super();
        /**
         *
         * @type {LoggerInterface}
         * @private
         */
        this._logger = logger;
    }

    /**
     *
     * @param {EventInterface} event
     * @return {Promise<void>}
     */
    notify(event) {
        this._logger.info(new SQLLogEvent(event.getEventData()));
        return Promise.resolve();
    }
}
