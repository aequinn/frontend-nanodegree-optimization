'use strict';

var jshint = require('gulp-jshint'),
    jsMinify = require('gulp-minify'),
    cssMinify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    lazypipe = require('lazypipe'),
    imageMin = require('gulp-imagemin'),
    pngQuant = require('imagemin-pngquant'),
    imageResize = require('gulp-image-resize'),
    gulp = require('gulp');

/*Compression Tasks for js*/
var jsHintTasks = lazypipe().pipe(jshint).pipe(jshint.reporter);
var jsMinifyTasks = jsHintTasks.pipe(jsMinify);
var jsTasks = jsMinifyTasks.pipe(gulp.dest,'dist');
gulp.task('jsCompress', function(){
  return gulp.src(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./gulpfile.js'])
  .pipe(jsTasks());
});

/*Compression Tasks for css*/
var cssMinifyTasks = lazypipe().pipe(cssMinify).pipe(rename,{suffix: "-min"});
var cssTasks = cssMinifyTasks.pipe(gulp.dest, 'dist');
gulp.task('cssCompress', function(){
  return gulp.src(['./**/*.css','!./node_modules/**', '!./dist/**' ])
  .pipe(cssTasks());
});

/*Compression Tasks for images*/
var imgMinifyTasks = lazypipe().pipe(imageMin,{progressive: true, use: [pngQuant(20)]}).pipe(gulp.dest, 'dist');
gulp.task('imgCompress', function(){
  return gulp.src(['./**/*.jpg','./**/*.png','!./node_modules/**', '!./dist/**'])
  .pipe(imgMinifyTasks());
});

/*Resize to 100 */
gulp.task('imgResize100', function(){
  return gulp.src(['./**/pizzeria.jpg','!./node_modules/**', '!./dist/**'] )
  .pipe(imageResize({imageMagick: true, width : 480, quality: 0}))
  .pipe(rename({suffix : '-480'}))
  .pipe(gulp.dest(''));
});
/*Resize to 480*/
gulp.task('imageResize480', function(){
  return gulp.src(['./**/pizzeria.jpg','!./node_modules/**', '!./dist/**'])
  .pipe(imageResize({imageMagick: true, width : 100, quality: .75}))
  .pipe(rename({suffix : '-100'}))
  .pipe(gulp.dest(''));
});

/*Move html*/
gulp.task('htmlMove', function(){
  return gulp.src(['./**/*.html','!./node_modules/**', '!./dist/**'])
  .pipe(gulp.dest('dist'));
});

/*Set to watch changes in files and run appropriate tasks*/
gulp.task('watchJS', function(){
  gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./gulpfile.js'], ['jsCompress']);
});

gulp.task('watchCSS', function(){
  gulp.watch(['./**/*.css', '!./node_modules/**', '!./dist/**'], ['cssCompress']);
});

gulp.task('default',['jsCompress','cssCompress','imgResize100','imageResize480','imgCompress','htmlMove']);
