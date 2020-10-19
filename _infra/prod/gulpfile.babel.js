import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
import SQLConnectionFactory from "../../src/_init/factories/SQLConnectionFactory";
import ConnectionInterface from "../../src/lib/db-connection/ConnectionInterface";
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

/**
 *
 * @param {function} cb
 * @param {function} gulpTaskFactoryMethod
 * @private
 */
const _runTask = (cb, gulpTaskFactoryMethod) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    SQLConnectionFactory.create(di)
        .then((connection) => di.get(ConnectionInterface).setServer(connection))
        .then(() => di.get(ConnectionInterface))
        .then((connection) => gulpTaskFactoryMethod(connection, di).go())
        .then(() => cb())
        .catch((err) => {
            console.log(err);
            cb();
        });
};

gulp.task("images:resize", (cb) =>
    _runTask(cb, (connection, di) => {
        return new GulpTask(
            new ImageRepository(
                connection,
                new ExtendedValuesEntityManager(di.get(EntityManager)),
                new ResizeImageFilterEntityFactory()
            ),
            new ResizeProcessorFactory(),
            new ImageResultFactory()
        );
    })
);

gulp.task("test:ml", (cb) =>
    _runTask(cb, (connection, di) => {
        return new GulpTask(
            new ImageRepository(
                connection,
                new ExtendedValuesEntityManager(di.get(EntityManager)),
                new MLImageFilterEntityFactory()
            ),
            new MLProcessorFactory(connection),
            new ImageResultFactory()
        );
    })
);
