var gulp = require('gulp');
var inject = require("gulp-inject");
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var path = require('path');
var mocha = require('gulp-mocha');

var paths = {
    app: {
        root: './public',
        index: './public/index.html',
        html: './public/**/*.html',
        scripts: './public/app/**/*.js',
        styles: './public/assets/**/*.css',
        images: '/public/images/**/*.{png,jpg,jpeg}'
    },
    dist: './dist',
    bower: './bower.json',
    tests: {
        mocha: './test/unit/**/*.js'
    }
};

gulp.task('inject', function () {
    var components = gulp.src(bowerFiles());

	var scripts = gulp.src(paths.app.scripts)
        .pipe(angularFilesort());

    var styles = gulp.src(paths.app.styles);

    return gulp.src(paths.app.index)
        .pipe(inject(es.merge(scripts, styles), {relative: true}))
        .pipe(inject(components, {name: 'bower', relative: true}))
        .pipe(gulp.dest(paths.app.root));
});

gulp.task('usemin', function() {
  return gulp.src(paths.app.html)
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('imagemin', function() {
    return gulp.src(paths.app.images)
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest(path.join(paths.dist, 'images')));
});

//gulp.task('watch', function() {
//  gulp.watch([paths.scripts, paths.assets, paths.bower], ['inject']);
//});

gulp.task('clean', function() {
  return gulp.src(paths.dist, {read: false})
      .pipe(clean());
});

gulp.task('copy', function() {
    // TODO
});

gulp.task('test', function() {
    return gulp.src(paths.tests.mocha, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build', ['clean', 'inject', 'usemin', 'imagemin', 'copy']);

gulp.task('default', ['build'], function() {
    // place code for your default task here
});
