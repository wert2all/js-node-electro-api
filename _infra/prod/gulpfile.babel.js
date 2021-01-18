import DIFactory from "../../src/_init/factories/DIFactory";
import ConsoleConfigFactory from "../../src/_init/factories/ConsoleConfigFactory";
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
import WatchFileFilterEntityFactory from "../../src/modules/console/watch/entity/WatchFileFilterEntityFactory";
import ResizeDestinationPathProviderFactory from "../../src/modules/console/resize/path/ResizeDestinationPathProviderFactory";

/**
 *
 * @param {function} cb
 * @param {function} gulpTaskFactoryMethod
 * @private
 */
const _runTask = (cb, gulpTaskFactoryMethod) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    gulpTaskFactoryMethod(di)
        .go()
        .then(() => cb())
        .catch((err) => {
            console.log(err);
            cb();
        });
};

gulp.task("images:resize", (cb) =>
    _runTask(cb, (di) => {
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
    _runTask(cb, (di) => {
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

gulp.task("watch:images", () => {
    DIFactory.create(ConsoleConfigFactory);
    const pathProvider = new ResizeDestinationPathProviderFactory().factory();
    const watchSrc = [pathProvider.getImageRootPath() + "**", "!" + pathProvider.getStorageConfig().getStoragePath()];
    return gulp.watch(watchSrc).on("add", (filePath) => {
        _runTask(Function.prototype, (di) => {
            return new GulpTask(
                new ImageRepository(
                    di.get(ReadConnectionInterface),
                    new ExtendedValuesEntityManager(di.get(EntityManager)),
                    new WatchFileFilterEntityFactory(filePath)
                ),
                new ResizeProcessorFactory(),
                new ImageResultFactory()
            );
        });
    });
});

gulp.task("watch", gulp.parallel("watch:images"));
