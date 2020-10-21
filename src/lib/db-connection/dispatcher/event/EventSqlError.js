import EventInterface from "../../../dispatcher/EventInterface";

/**
 * @class EventSqlError
 * @extends EventInterface
 * @type EventInterface
 */
export default class EventSqlError extends EventInterface {
    static EVENT_NAME = "sql.error";

    /**
     *
     * @param {string} sql
     * @param {Error} error
     */
    constructor(sql, error) {
        super();
        /**
         *
         * @type {string}
         * @private
         */
        this._sql = sql;
        /**
         *
         * @type {Error}
         * @private
         */
        this._error = error;
    }

    getEventData() {
        return "Error:\n\n" + this._error.message + "\nSQL: \n\n" + this._sql;
    }

    /**
     *
     * @return {string}
     */
    getEventName() {
        return EventSqlError.EVENT_NAME;
    }
}
