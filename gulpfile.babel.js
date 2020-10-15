import GulpTask from "./src/gulp/GulpTask";
import ImageRepository from "./src/gulp/image/default/ImageRepository";
import DIFactory from "./src/_init/factories/DIFactory";
import ConsoleConfigFactory from "./src/_init/factories/ConsoleConfigFactory";
import SQLConnectionFactory from "./src/_init/factories/SQLConnectionFactory";
import ConnectionInterface from "./src/lib/db-connection/ConnectionInterface";
import ExtendedValuesEntityManager from "./src/extended/ExtendedValuesEntityManager";
import EntityManager from "./src/lib/db-entity-manager/EntityManager";
import MLProcessorFactory from "./src/ml/processor/MLProcessorFactory";
import ImageResultFactory from "./src/gulp/image/default/ImageResultFactory";

const gulp = require("gulp");
const babel = require("gulp-babel");
const clean = require("gulp-clean");
const PluginError = require("plugin-error");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync").create();
const runCLI = require("@jest/core").runCLI;
const through2 = require("through2");

const jest = (options = {}) => {
    return through2.obj((file, enc, cb) => {
        options = Object.assign(
            {
                rootDir: file ? process.cwd() : undefined,
            },
            options
        );
        runCLI(options, [options.rootDir]).then(({ results }) => {
            if (results.numFailedTests || results.numFailedTestSuites) {
                cb(new PluginError("gulp-jest", { message: "Tests Failed" }));
            } else if (typeof results.success !== "undefined" && !results.success) {
                cb(new PluginError("gulp-jest", { message: "Tests Failed due to coverage threshold breaches" }));
            } else {
                cb();
            }
        });
    });
};
gulp.task("test:unit", () => gulp.src("test/").pipe(jest()));

gulp.task("test", gulp.parallel("test:unit"));

gulp.task("copy:package", () => gulp.src("package.json").pipe(gulp.dest("dist/")));

gulp.task("copy:images", () => gulp.src("./assets/img/**/*").pipe(gulp.dest("dist/assets/img/")));

gulp.task("copy:templates", () => gulp.src("./templates/**/*").pipe(gulp.dest("dist/templates/")));

gulp.task("copy", gulp.parallel("copy:package", "copy:templates", "copy:images"));

gulp.task("build:webpack", () => {
    return gulp
        .src("assets/js.js")
        .pipe(webpack(require("./webpack.config")))
        .pipe(gulp.dest("dist/assets/"));
});

gulp.task("build:src", () => gulp.src(["src/**/*"]).pipe(babel()).pipe(gulp.dest("dist/src/")));

gulp.task("build", gulp.parallel("build:src", "build:webpack"));

gulp.task("default", gulp.parallel("build", "copy"));

gulp.task("clean", () => gulp.src("dist/*").pipe(clean()));

gulp.task("serve:init", (cb) => {
    browserSync.init({
        proxy: "localhost:3000",
        port: 3001,
    });
    return cb();
});

gulp.task("serve:reload", (cb) => {
    browserSync.reload();
    return cb();
});
gulp.task("serve", gulp.series("serve:init"));

// Watch files
function watchFiles() {
    gulp.watch(["./src/**/*"], gulp.series("build:src", "serve:reload"));
    gulp.watch("./assets/**/*", gulp.series("build:webpack", "copy:images", "serve:reload"));
    gulp.watch("./templates/**/*", gulp.series("copy:templates", "serve:reload"));
}

gulp.task("test:ml", (cb) => {
    const di = DIFactory.create(ConsoleConfigFactory);
    SQLConnectionFactory.create(di)
        .then((connection) => di.get(ConnectionInterface).setServer(connection))
        .then(() => di.get(ConnectionInterface))
        .then((connection) => {
            const task = new GulpTask(
                new ImageRepository(connection, new ExtendedValuesEntityManager(di.get(EntityManager))),
                new MLProcessorFactory(connection),
                new ImageResultFactory()
            );
            return task.go(cb);
        })
        .then(() => cb())
        .catch((err) => {
            console.log(err);
            cb();
        });
});
const watch = gulp.series("serve", watchFiles);

exports.dev = watch;
