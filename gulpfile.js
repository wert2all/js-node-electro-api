const gulp = require('gulp');

gulp.task('build', () => {
    return gulp.src(['app.js', 'package.json'])
        .pipe(gulp.dest('dist/'));
});
