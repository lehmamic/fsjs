var gulp = require('gulp');
var inject = require("gulp-inject");
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('index', function () {
    //var target = gulp.src('./public/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    //var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    var libFiles = gulp.src(bowerFiles(), {read: false})
        .pipe(angularFilesort());
    var sources = gulp.src('./public/app/**/*.js', {read: false})
        .pipe(angularFilesort());
    var assets = gulp.src('./public/assets/**/*.css');

    return gulp.src('./public/index.html')
        .pipe(inject(libFiles), {name: 'bower'})
        .pipe(inject(es.merge(sources, assets)))
        .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
    gulp.watch(['./public/**/*.js', './public/**/*.css', './public/**/*.html'], ['index']);
});

gulp.task('build', function() {

});