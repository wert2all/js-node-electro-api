import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
import SQLiteConnectionFactory from "../../src/_init/factories/SQLiteConnectionFactory";
import GulpTask from "../../src/lib/console/gulp/GulpTask";
import ImageRepository from "../../src/lib/console/gulp/image/default/ImageRepository";
import ExtendedValuesEntityManager from "../../src/extended/ExtendedValuesEntityManager";
import EntityManager from "../../src/lib/db-entity-manager/EntityManager";
import ResizeImageFilterEntityFactory from "../../src/modules/console/resize/entity/ResizeImageFilterEntityFactory";
import ResizeProcessorFactory from "../../src/modules/console/resize/ResizeProcessorFactory";
import ImageResultFactory from "../../src/lib/console/gulp/image/default/ImageResultFactory";
import MLImageFilterEntityFactory from "../../src/modules/console/ml/entity/MLImageFilterEntityFactory";
import MLProcessorFactory from "../../src/modules/console/ml/processor/MLProcessorFactory";
import gulp from "gulp";
import ReadConnectionInterface from "../../src/lib/db-connection/ReadConnectionInterface";
import WriteConnectionInterface from "../../src/lib/db-connection/WriteConnectionInterface";
import MysqlConnectionFactory from "../../src/_init/factories/MysqlConnectionFactory";
import MysqlWriteConnection from "../../src/lib/db-connection/adapter/mysql/MysqlWriteConnection";
import MysqlReadConnection from "../../src/lib/db-connection/adapter/mysql/MysqlReadConnection";
import DispatchInterface from "../../src/lib/dispatcher/DispatchInterface";
import TablesFactory from "../../src/lib/db-connection/tables/TablesFactory";
import UserDefinition from "../../src/db/definition/UserDefinition";
import UserProfileDefinition from "../../src/db/definition/UserProfileDefinition";
import UserFilesDefinition from "../../src/db/definition/UserFilesDefinition";
import ExtendedValuesDefinition from "../../src/db/definition/ExtendedValuesDefinition";
import MLModelLoggingDefinition from "../../src/db/definition/ml/MLModelLoggingDefinition";
import MLModelTrainingDefinition from "../../src/db/definition/ml/MLModelTrainingDefinition";
import MysqlQueryExecutor from "../../src/lib/db-connection/adapter/mysql/MysqlQueryExecutor";
import MysqlTableCreator from "../../src/lib/db-connection/adapter/mysql/MysqlTableCreator";
import TablesFactoryInterface from "../../src/lib/db-connection/tables/TablesFactoryInterface";
import UserRepository from "../../src/db/repository/UserRepository";
import UserEntity from "../../src/data/entity/UserEntity";
import UserProfileRepository from "../../src/db/repository/UserProfileRepository";
import UserProfileEntity from "../../src/data/entity/UserProfileEntity";
import UserFilesEntity from "../../src/data/entity/UserFilesEntity";
import FilesRepository from "../../src/db/repository/FilesRepository";
import ExtendedValuesRepository from "../../src/db/repository/ExtendedValuesRepository";
import ExtendedValuesEntity from "../../src/data/entity/ExtendedValuesEntity";

/**
 *
 * @param {function} cb
 * @param {function} gulpTaskFactoryMethod
 * @private
 */
const _runTask = (cb, gulpTaskFactoryMethod) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    SQLiteConnectionFactory.create(di)
        .then((connection) => {
            di.get(ReadConnectionInterface).setServer(connection);
            di.get(WriteConnectionInterface).setServer(connection);
        })
        .then(() => di.get(ReadConnectionInterface))
        .then((readConnection) => gulpTaskFactoryMethod(readConnection, di).go())
        .then(() => cb())
        .catch((err) => {
            console.log(err);
            cb();
        });
};

gulp.task("images:resize", (cb) =>
    _runTask(cb, (readConnection, di) => {
        return new GulpTask(
            new ImageRepository(
                readConnection,
                new ExtendedValuesEntityManager(di.get(EntityManager)),
                new ResizeImageFilterEntityFactory()
            ),
            new ResizeProcessorFactory(),
            new ImageResultFactory()
        );
    })
);

gulp.task("test:ml", (cb) =>
    _runTask(cb, (readConnection, di) => {
        return new GulpTask(
            new ImageRepository(
                readConnection,
                new ExtendedValuesEntityManager(di.get(EntityManager)),
                new MLImageFilterEntityFactory()
            ),
            new MLProcessorFactory(readConnection),
            new ImageResultFactory()
        );
    })
);

gulp.task("db:migrate", (cb) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    return MysqlConnectionFactory.create(di)
        .then((connections) => {
            const writeConnection = new MysqlWriteConnection();
            const readConnection = new MysqlReadConnection();
            readConnection.setServer(connections.read);
            writeConnection.setServer(connections.write);
            readConnection.setDispatcher(di.get(DispatchInterface));
            writeConnection.setDispatcher(di.get(DispatchInterface));
            di.register(MysqlWriteConnection, writeConnection);
            di.register(MysqlReadConnection, readConnection);
            const tableFactory = new TablesFactory(
                [
                    new UserDefinition(),
                    new UserProfileDefinition(),
                    new UserFilesDefinition(),
                    new ExtendedValuesDefinition(),
                    new MLModelLoggingDefinition(),
                    new MLModelTrainingDefinition(),
                ],
                new MysqlTableCreator(new MysqlQueryExecutor())
            );
            return tableFactory.setServer(connections.write).create();
        })
        .then(() => SQLiteConnectionFactory.create(di))
        .then((connection) => {
            di.get(ReadConnectionInterface).setServer(connection);
            di.get(WriteConnectionInterface).setServer(connection);
            return connection;
        })
        .then((connection) => {
            return di.get(TablesFactoryInterface).setServer(connection).create();
        })
        .then(() => {
            const mysqlEm = new EntityManager(di.get(MysqlReadConnection), di.get(MysqlWriteConnection));
            /**
             *
             * @type {ReadConnectionInterface}
             */
            const readSqliteConnection = di.get(ReadConnectionInterface);

            const migrationList = [
                {
                    repository: new UserRepository(),
                    entity: new UserEntity(),
                },
                {
                    repository: new UserProfileRepository(),
                    entity: new UserProfileEntity(),
                },
                {
                    repository: new FilesRepository(),
                    entity: new UserFilesEntity(),
                },
                {
                    repository: new ExtendedValuesRepository(),
                    entity: new ExtendedValuesEntity(),
                },
            ];

            return Promise.all(
                migrationList.map((item) => {
                    item.repository.setConnection(readSqliteConnection);
                    return item.repository
                        .fetchData(item.entity)
                        .then((entities) =>
                            Promise.all(entities.map((entity) => mysqlEm.save(item.repository.getDefinition(), entity)))
                        );
                })
            );
        })
        .then(() => {
            console.log("done");
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb();
        });
});
