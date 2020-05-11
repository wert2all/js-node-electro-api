const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const PluginError = require('plugin-error');

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

gulp.task('copy', gulp.parallel('copy:package'));

gulp.task('build:src', () =>
    gulp.src(['src/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('dist/src/')));

gulp.task('build', gulp.series('build:src'));

gulp.task('default', gulp.series('build', 'copy'));

gulp.task('clean', () =>
    gulp.src('dist/*')
        .pipe(clean()));

// Watch files
function watchFiles() {
    gulp.watch('./src/**/*', gulp.series('build'));
}

const watch = gulp.series(watchFiles);

exports.dev = watch;
