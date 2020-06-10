const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const PluginError = require('plugin-error');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

gulp.task('test:static', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(eslint.results(results => {
            // This is the total count of warnings across all results
            const count = results.warningCount;
            const maxWarnings = 0;
            if (count > maxWarnings) {
                // throwing anything will fail the stream,
                // just like eslint.failOnError.
                // Tip: You can throw a Gulp PluginError (or just the config) to
                // customize the gulp message.
                throw new PluginError('gulp-eslint', {
                    name: 'ESLintError',
                    message: 'Failed because of too many warnings. ' +
                        'Found ' + count
                        + (count === 1 ? ' warning' : ' warnings') +
                        ', threshold is ' + maxWarnings + '.'
                });
            }
        }));
});
gulp.task('test', gulp.series('test:static'));

gulp.task('copy:package', () =>
    gulp.src('package.json')
        .pipe(gulp.dest('dist/')));

gulp.task('copy:images', () =>
    gulp.src('./assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img/')));

gulp.task('copy', gulp.parallel('copy:package', 'copy:images'));

gulp.task('build:webpack', () => {
    return gulp.src('assets/js.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('build:src', () =>
    gulp.src(['src/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('dist/src/')));

gulp.task('build', gulp.parallel('build:src', 'build:webpack'));

gulp.task('default', gulp.parallel('build', 'copy'));

gulp.task('clean', () =>
    gulp.src('dist/*')
        .pipe(clean()));

gulp.task('serve:init', cb => {
    browserSync.init({
        proxy: 'localhost:3000',
        port: 3001
    });
    return cb();
});

gulp.task('serve:reload', (cb) => {
    browserSync.reload();
    return cb();
});
gulp.task('serve', gulp.series('serve:init'));

// Watch files
function watchFiles() {
    gulp.watch(['./src/**/*'], gulp.series('build:src', 'serve:reload'));
    gulp.watch('./assets/**/*',
        gulp.series('build:webpack', 'copy:images', 'serve:reload')
    );
    gulp.watch('./templates/**/*', gulp.series('serve:reload'));
}

const watch = gulp.series('serve', watchFiles);

exports.dev = watch;
