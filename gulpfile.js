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
var pngquant = require('imagemin-pngquant');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var path = require('canonical-path');
var mocha = require('gulp-mocha');

var paths = {
  index: './public/index.html',
  html: './public/**/*.html',
  scripts: './public/app/**/*.js',
  styles: './public/assets/**/*.css',
  images: '/public/images/**/*.{png,jpg,jpeg}',
  bower: './bower.json',
  nodetests: './test/unit/**/*.js',
  app: './public',
  dist: './dist'
};

gulp.task('inject', function () {
    var components = gulp.src(bowerFiles());

	var scripts = gulp.src(paths.scripts)
        .pipe(angularFilesort());

    var styles = gulp.src(paths.styles);

    return gulp.src('./public/index.html')
        .pipe(inject(es.merge(scripts, styles), {relative: true}))
        .pipe(inject(components, {name: 'bower', relative: true}))
        .pipe(gulp.dest('./public'));
});

//gulp.task('usemin', function() {
//  return gulp.src(paths.html)
//    .pipe(usemin({
//      css: [minifyCss(), 'concat'],
//      html: [minifyHtml({empty: true})],
//      js: [uglify(), rev()]
//    }))
//    .pipe(gulp.dest(paths.dist));
//});

//gulp.task('imagemin', function() {
//    return gulp.src(paths.images)
//        .pipe(imagemin({
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant()]
//        }))
//        .pipe(gulp.dest(path.join(paths.dist, 'images')));
//});
//
//gulp.task('watch', function() {
//  gulp.watch([paths.scripts, paths.assets, paths.bower], ['inject']);
//});
//
//gulp.task('clean', function() {
//  return gulp.src(paths.dist, {read: false})
//      .pipe(clean());
//});
//
//gulp.task('copy', function() {
//
//});
//
//gulp.task('test', function() {
//    return gulp.src(paths.nodetests, {read: false})
//        .pipe(mocha({reporter: 'spec'}));
//});
//
//gulp.task('build', ['clean', 'inject', 'usemin', 'imagemin', 'copy']);
//
//gulp.task('default', ['build'], function() {
//    // place code for your default task here
//});
