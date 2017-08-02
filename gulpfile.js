var gulp = require('gulp');
var ts  = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('test:compile', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./dist'))
});

gulp.task('test:watch', ['test:compile'], function () {
    gulp.watch('./src/**/*.ts', ['test:compile']);
});