import DIFactory from "./factories/DIFactory";
import SQLConnectionFactory from "./factories/SQLConnectionFactory";
import ConnectionInterface from "../lib/db-connection/ConnectionInterface";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";

export default class Runner {
    /**
     *
     * @param {function} onConnect
     */
    constructor(onConnect = Function.prototype) {
        this._onConnect = onConnect;
    }

    /**
     *
     */
    run() {
        const di = DIFactory.create();

        SQLConnectionFactory.create(di)
            .then((connection) => di.get(ConnectionInterface).setServer(connection))
            .then(() => this._onConnect(di))
            .catch((err) => {
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
