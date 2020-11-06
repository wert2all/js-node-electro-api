import DIFactory from "./factories/DIFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import ReadConnectionInterface from "../lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../lib/db-connection/WriteConnectionInterface";
import TablesFactoryInterface from "../lib/db-connection/tables/TablesFactoryInterface";
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
            .then((mysqlConnections) => {
                di.get(ReadConnectionInterface).setServer(mysqlConnections.read);
                di.get(WriteConnectionInterface).setServer(mysqlConnections.write);
                return mysqlConnections;
            })
            .then((mysqlConnections) => di.get(TablesFactoryInterface).setServer(mysqlConnections.write).create())
            .then(() => this._onConnect(di))
            .catch((err) => {
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
