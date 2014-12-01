var gulp = require('gulp');
var inject = require("gulp-inject");
var bowerFiles = require('main-bower-files');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var using = require('gulp-using');

var paths = {
  index: './public/index.html',
  scripts: './public/app/**/*.js',
  assets: './public/assets/**/*.css',
  bower: './bower.json',
  app: './public',
  dist: './dist'
};

gulp.task('inject', function () {
    //var target = gulp.src('./public/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    //var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    var components = gulp.src(bowerFiles(), {read: false})
        .pipe(using());

	var scripts = gulp.src(paths.scripts, {read: false})
        .pipe(angularFilesort());
		
    var assets = gulp.src(paths.assets, {read: false});

    return gulp.src(paths.index)
       // .pipe(using())
        .pipe(inject(components), {name: 'bower'})
        .pipe(inject(es.merge(scripts, assets)))
        .pipe(gulp.dest(paths.app));
});

gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts, paths.assets, paths.bower], ['inject']);
});

gulp.task('clean', function() {
  return gulp.src(paths.dist, {read: false})
      .pipe(clean());
});

gulp.task('build', ['clean', 'inject', 'usemin']);

gulp.task('default', ['build'], function() {
    // place code for your default task here
});