'use strict';

var jshint = require('gulp-jshint'),
    jsMinify = require('gulp-minify'),
    cssMinify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    lazypipe = require('lazypipe'),
    gulp = require('gulp');

/*Compression Tasks*/
var jsHintTasks = lazypipe().pipe(jshint).pipe(jshint.reporter);
var jsMinifyTasks = jsHintTasks.pipe(jsMinify);
var jsTasks = jsMinifyTasks.pipe(gulp.dest,'dist');
gulp.task('jsCompress', function(){
  return gulp.src(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./gulpfile.js'])
  .pipe(jsTasks());
});

var cssMinifyTasks = lazypipe().pipe(cssMinify).pipe(rename,{suffix: "-min"});
var cssTasks = cssMinifyTasks.pipe(gulp.dest, 'dist');
gulp.task('cssCompress', function(){
  return gulp.src(['./**/*.css','!./node_modules/**', '!./dist/**' ])
  .pipe(cssTasks());
});

/*Set to watch changes in files and run appropriate tasks*/
gulp.task('watchJS', function(){
  gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**', '!./gulpfile.js'], ['jsCompress']);
});

gulp.task('watchCSS', function(){
  gulp.watch(['./**/*.css', '!./node_modules/**', '!./dist/**'], ['cssCompress']);
});

gulp.task('default',['jsCompress','cssCompress']);
