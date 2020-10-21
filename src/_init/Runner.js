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
import UserRepository from "../db/repository/UserRepository";
import UserEntity from "../data/entity/UserEntity";
import DefinitionOrder from "../lib/db-definition/DefinitionOrder";
import UserDefinition from "../db/definition/UserDefinition";
import DefinitionLimit from "../lib/db-definition/DefinitionLimit";

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
                const readConnection = new MysqlReadConnection();
                readConnection.setServer(mysqlConnections.write);
                readConnection.setDispatcher(di.get(DispatchInterface));
                const repository = new UserRepository();
                repository.setConnection(readConnection);

                const userEntity = new UserEntity();

                repository
                    .fetchData(
                        userEntity,
                        new DefinitionOrder(UserDefinition.COLUMN_GOOGLE_ID, DefinitionOrder.TYPE_ASC),
                        new DefinitionLimit(0, 2),
                        { id: UserDefinition.COLUMN_GOOGLE_ID }
                    )
                    .then((data) => {
                        data.forEach((user) => console.log(user.getData()));
                        return null;
                    })
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
