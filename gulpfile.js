'use strict';

const gulp       = require('gulp')
  , browserSync  = require('browser-sync').create()
  , less         = require('gulp-less')
  , autoprefixer = require('gulp-autoprefixer')
  , plumber      = require('gulp-plumber')
  , notify       = require('gulp-notify')
  , pug          = require('gulp-pug')
  , inlinesource = require('gulp-inline-source')
  , ghPages      = require('gulp-gh-pages')
  , join         = require('path').join
  , dest         = 'build'
  ;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: dest
    }
  });
});

gulp.task('less', () => {
  return gulp.src('less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest))
    .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('js', () => {
  return gulp.src('js/*.js')
    .pipe(gulp.dest(dest))
    .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('img', () => {
  return gulp.src('img/{gsw,alli}.jpg')
    .pipe(gulp.dest(dest))
    .pipe(notify({
      message: 'Finished images',
      onLast: true
    }));
});

gulp.task('icons', () => {
  const names = [
    'briefcase',
    'github',
    'instagram',
    'linkedin-square',
    'map-marker',
    'envelope',
    'envelope-o',
    'male',
    'twitter',
  ].join(',');
  return gulp.src(`icons/black/svg/{${names}}.svg`)
    .pipe(gulp.dest(join(dest, 'icons')))
    .pipe(notify({
      message: 'Finished icons',
      onLast: true
    }));
});

gulp.task('pug', ['less', 'js', 'icons'], () => {
  return gulp.src('pug/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(inlinesource({ compress: process.env.PUBLISH === 'true' }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
    .pipe(notify('Finished file: <%= file.relative %>'));
});

gulp.task('static', () => {
  return gulp.src('static/*')
    .pipe(gulp.dest(dest))
    .pipe(notify({
      message: 'Finished static files',
      onLast: true
    }));
});

gulp.task('clean', () => {
  require('del').sync(['build', '.publish']);
});

gulp.task('build', ['less', 'icons', 'img', 'static', 'js', 'pug']);

gulp.task('publish', ['clean', 'build'], () => {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
})

gulp.task('default', ['build', 'browser-sync'], () => {
  const src = [
    'less/*.less',
    'js/*.js',
    'img/*.jpg',
    'pug/*.pug'
  ];
  gulp.watch(src, ['pug']);
});
