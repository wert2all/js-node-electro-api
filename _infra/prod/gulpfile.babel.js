import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
import SQLConnectionFactory from "../../src/_init/factories/SQLConnectionFactory";
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

/**
 *
 * @param {function} cb
 * @param {function} gulpTaskFactoryMethod
 * @private
 */
const _runTask = (cb, gulpTaskFactoryMethod) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    SQLConnectionFactory.create(di)
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
