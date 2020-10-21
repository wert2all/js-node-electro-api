import ObserverInterface from "../../dispatcher/ObserverInterface";
import AppLogEvent from "../../../extended/logger/events/AppLogEvent";

/**
 * @class ExecSqlErrorObserver
 * @export ObserverInterface
 * @type ObserverInterface
 */
export default class ExecSqlErrorObserver extends ObserverInterface {
    /**
     *
     * @param {TelegramApi} telegramApi
     * @param {LoggerInterface} logger
     */
    constructor(telegramApi, logger) {
        super();
        /**
         *
         * @type {TelegramApi}
         * @private
         */
        this._telegramApi = telegramApi;
        /**
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
        return this._telegramApi
            .sendMessage(event.getEventData())
            .then(() => null)
            .catch((error) => this._logger.error(new AppLogEvent(error.message)));
    }
}
