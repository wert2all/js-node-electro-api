import DIFactory from "./factories/DIFactory";
import SQLiteConnectionFactory from "./factories/SQLiteConnectionFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import ReadConnectionInterface from "../lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../lib/db-connection/WriteConnectionInterface";
import MysqlConnectionFactory from "./factories/MysqlConnectionFactory";

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

        MysqlConnectionFactory.create(di)
            .then((mysqlConnections) => SQLiteConnectionFactory.create(di))
            .then((connection) => {
                di.get(ReadConnectionInterface).setServer(connection);
                di.get(WriteConnectionInterface).setServer(connection);
            })
            .then(() => this._onConnect(di))
            .catch((err) => {
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
