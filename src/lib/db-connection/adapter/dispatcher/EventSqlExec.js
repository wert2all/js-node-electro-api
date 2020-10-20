import EventInterface from "../../../dispatcher/EventInterface";

/**
 * @class EventSqlExec
 * @extends EventInterface
 * @type EventInterface
 */
export default class EventSqlExec extends EventInterface {
    static EVENT_NAME = "sql.exec";

    /**
     *
     * @param {string} sql
     */
    constructor(sql) {
        super();
        this._sql = sql;
    }

    getEventData() {
        return this._sql;
    }

    /**
     *
     * @return {string}
     */
    getEventName() {
        return EventSqlExec.EVENT_NAME;
    }
}
