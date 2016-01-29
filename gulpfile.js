'use strict';

const gulp      = require('gulp')
  , browserSync = require('browser-sync').create()
  , less        = require('gulp-less')
  , minifyCSS   = require('gulp-cssnano')
  , autoprefixer = require('gulp-autoprefixer')
  , plumber     = require('gulp-plumber')
  , notify      = require('gulp-notify')
  , jade        = require('gulp-jade')
  , uglify      = require('gulp-uglify')
  , sourcemaps  = require('gulp-sourcemaps')
  ;

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('less', function () {
  return gulp.src('css/src/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/dist'))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('js', function () {
  return gulp.src('js/src/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js/dist'))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('jade', function () {
  return gulp.src('jade/index.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(''))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'));
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browser-sync'], function () {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/index.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});
