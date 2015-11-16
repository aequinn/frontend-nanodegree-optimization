'use strict';

var jshint = require('gulp-jshint');
var gulp = require('gulp');



gulp.task('jshint', function(){
  return gulp.src(['./**/*.js', '!./node_modules/**'])
  .pipe(jshint())
  .pipe(jshint.reporter());
});
gulp.task('default',['jshint']);
