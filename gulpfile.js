const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

gulp.task('copy:package', () =>
    gulp.src(['package.json'])
        .pipe(gulp.dest('dist/')));

gulp.task('copy', gulp.parallel('copy:package'));

gulp.task('build:root', () =>
    gulp.src(['app.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist/')));

gulp.task('build:src', () =>
    gulp.src(['src/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('dist/src/')));


gulp.task('build', gulp.series('build:root', 'build:src'));

gulp.task('default', gulp.series('build', 'copy'));

gulp.task('clean', () =>
    gulp.src('dist/*')
        .pipe(clean()));

// Watch files
function watchFiles() {
    gulp.watch('./src/**/*', gulp.series('build'));
    gulp.watch('./app.js', gulp.series('build'));
}

const watch = gulp.series(watchFiles);

exports.dev = watch;
