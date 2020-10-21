import DIFactory from "./factories/DIFactory";
import SQLiteConnectionFactory from "./factories/SQLiteConnectionFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import ReadConnectionInterface from "../lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../lib/db-connection/WriteConnectionInterface";
import MysqlConnectionFactory from "./factories/MysqlConnectionFactory";
import TablesFactoryInterface from "../lib/db-connection/tables/TablesFactoryInterface";
import DispatchInterface from "../lib/dispatcher/DispatchInterface";
import MysqlReadConnection from "../lib/db-connection/adapter/mysql/MysqlReadConnection";
import EntityManager from "../lib/db-entity-manager/EntityManager";
import UserDefinition from "../db/definition/UserDefinition";
import UserEntity from "../data/entity/UserEntity";
import MysqlWriteConnection from "../lib/db-connection/adapter/mysql/MysqlWriteConnection";

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
                const em = new EntityManager(readConnection, writeConnection);
                const userEntity = new UserEntity();
                userEntity.setValue(UserDefinition.COLUMN_GOOGLE_ID, "COLUMN_GOOGLE_ID2");
                userEntity.setValue(UserDefinition.COLUMN_GOOGLE_NAME, "COLUMN_GOOGLE_NAME");
                userEntity.setValue(UserDefinition.COLUMN_GOOGLE_EMAIL, "COLUMN_GOOGLE_EMAIL");
                userEntity.setValue(UserDefinition.COLUMN_IS_ADMIN, "n");
                userEntity.setValue(UserDefinition.COLUMN_PHOTO_PATH, "COLUMN_PHOTO_PATH");

                em.save(new UserDefinition(), userEntity)
                    .then((data) => console.log(data))
                    .catch((error) => console.log(error));
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
