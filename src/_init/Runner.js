import DIFactory from "./factories/DIFactory";
import SQLiteConnectionFactory from "./factories/SQLiteConnectionFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import ReadConnectionInterface from "../lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../lib/db-connection/WriteConnectionInterface";
import TablesFactoryInterface from "../lib/db-connection/tables/TablesFactoryInterface";
import MysqlConnectionFactory from "./factories/MysqlConnectionFactory";
import MysqlWriteConnection from "../lib/db-connection/adapter/mysql/MysqlWriteConnection";
import MysqlReadConnection from "../lib/db-connection/adapter/mysql/MysqlReadConnection";
import DispatchInterface from "../lib/dispatcher/DispatchInterface";

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
                const writeConnection = new MysqlWriteConnection();
                const readConnection = new MysqlReadConnection();
                readConnection.setServer(mysqlConnections.read);
                writeConnection.setServer(mysqlConnections.write);
                readConnection.setDispatcher(di.get(DispatchInterface));
                writeConnection.setDispatcher(di.get(DispatchInterface));
                di.register(MysqlWriteConnection, writeConnection);
                di.register(MysqlReadConnection, readConnection);
                return null;
            })
            .then(() => SQLiteConnectionFactory.create(di))
            .then((connection) => {
                di.get(ReadConnectionInterface).setServer(connection);
                di.get(WriteConnectionInterface).setServer(connection);
                return connection;
            })
            .then((connection) => di.get(TablesFactoryInterface).setServer(connection).create())
            .then(() => this._onConnect(di))
            .catch((err) => {
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
