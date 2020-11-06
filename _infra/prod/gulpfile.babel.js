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
import TablesFactoryInterface from "../../src/lib/db-connection/tables/TablesFactoryInterface";
import UserRepository from "../../src/db/repository/UserRepository";
import UserEntity from "../../src/data/entity/UserEntity";
import UserProfileRepository from "../../src/db/repository/UserProfileRepository";
import UserProfileEntity from "../../src/data/entity/UserProfileEntity";
import UserFilesEntity from "../../src/data/entity/UserFilesEntity";
import FilesRepository from "../../src/db/repository/FilesRepository";
import ExtendedValuesRepository from "../../src/db/repository/ExtendedValuesRepository";
import ExtendedValuesEntity from "../../src/data/entity/ExtendedValuesEntity";
import SQLiteReadConnection from "../../src/lib/db-connection/adapter/sqlite/SQLiteReadConnection";

/**
 *
 * @param {function} cb
 * @param {function} gulpTaskFactoryMethod
 * @private
 */
const _runTask = (cb, gulpTaskFactoryMethod) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    MysqlConnectionFactory.create(di)
        .then((mysqlConnections) => {
            di.get(ReadConnectionInterface).setServer(mysqlConnections.read);
            di.get(WriteConnectionInterface).setServer(mysqlConnections.write);
            return mysqlConnections;
        })
        .then(() => gulpTaskFactoryMethod(di).go())
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
                di.get(ReadConnectionInterface),
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
                di.get(ReadConnectionInterface),
                new ExtendedValuesEntityManager(di.get(EntityManager)),
                new MLImageFilterEntityFactory()
            ),
            new MLProcessorFactory(di.get(ReadConnectionInterface)),
            new ImageResultFactory()
        );
    })
);

gulp.task("db:migrate", (cb) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    return MysqlConnectionFactory.create(di)
        .then((mysqlConnections) => {
            di.get(ReadConnectionInterface).setServer(mysqlConnections.read);
            di.get(WriteConnectionInterface).setServer(mysqlConnections.write);
            return mysqlConnections;
        })
        .then((mysqlConnections) => di.get(TablesFactoryInterface).setServer(mysqlConnections.write).create())
        .then(() => SQLiteConnectionFactory.create(di))
        .then((sqliteConnection) => {
            const mysqlEm = new EntityManager(di.get(ReadConnectionInterface), di.get(WriteConnectionInterface));
            /**
             *
             * @type {ReadConnectionInterface}
             */
            const readSqliteConnection = new SQLiteReadConnection();
            readSqliteConnection.setServer(sqliteConnection);

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
