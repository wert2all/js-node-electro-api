import DIFactory from "./factories/DIFactory";
import SQLConnectionFactory from "./factories/SQLConnectionFactory";
import ConnectionInterface from "../lib/db-connection/ConnectionInterface";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";

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
        const di = DIFactory.create(ServerConfigFactory);

        SQLConnectionFactory.create(di)
            .then((connection) => di.get(ConnectionInterface).setServer(connection))
            .then(() => this._onConnect(di))
            .catch((err) => {
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
