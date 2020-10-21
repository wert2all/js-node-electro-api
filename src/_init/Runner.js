import DIFactory from "./factories/DIFactory";
import SQLiteConnectionFactory from "./factories/SQLiteConnectionFactory";
import LoggerInterface from "../lib/logger/LoggerInterface";
import AppLogEvent from "../extended/logger/events/AppLogEvent";
import ServerConfigFactory from "./factories/ServerConfigFactory";
import ReadConnectionInterface from "../lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../lib/db-connection/WriteConnectionInterface";
import MysqlConnectionFactory from "./factories/MysqlConnectionFactory";
import QueryExecutor from "../lib/db-connection/adapter/mysql/QueryExecutor";
import TableCreator from "../lib/db-connection/adapter/mysql/TableCreator";
import TablesFactory from "../lib/db-connection/tables/TablesFactory";
import UserDefinition from "../db/definition/UserDefinition";
import UserProfileDefinition from "../db/definition/UserProfileDefinition";
import ExtendedValuesDefinition from "../db/definition/ExtendedValuesDefinition";
import MLModelLoggingDefinition from "../db/definition/ml/MLModelLoggingDefinition";
import MLModelTrainingDefinition from "../db/definition/ml/MLModelTrainingDefinition";
import UserFilesDefinition from "../db/definition/UserFilesDefinition";

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
                const queryExecutor = new QueryExecutor();
                queryExecutor.setServer(mysqlConnections.write);
                const tableCreator = new TableCreator(queryExecutor);
                return new TablesFactory(
                    [
                        new UserDefinition(),
                        new UserProfileDefinition(),
                        new UserFilesDefinition(),
                        new ExtendedValuesDefinition(),
                        new MLModelLoggingDefinition(),
                        new MLModelTrainingDefinition(),
                    ],
                    tableCreator
                ).create();
            })
            .then(() => SQLiteConnectionFactory.create(di))
            .then((connection) => {
                di.get(ReadConnectionInterface).setServer(connection);
                di.get(WriteConnectionInterface).setServer(connection);
            })
            .then(() => this._onConnect(di))
            .catch((err) => {
                console.log(err);
                di.get(LoggerInterface).error(new AppLogEvent(err.message));
            });
    }
}
