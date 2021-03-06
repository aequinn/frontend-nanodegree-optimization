'use strict';

var jshint = require('gulp-jshint'),
    jsMinify = require('gulp-minify'),
    cssMinify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    lazypipe = require('lazypipe'),
    imageMin = require('gulp-imagemin'),
    pngQuant = require('imagemin-pngquant'),
    imageResize = require('gulp-image-resize'),
    htmlReplace = require('gulp-html-replace'),
    concat = require('gulp-concat'),
    gulp = require('gulp');

/*Compression Tasks for js*/
var jsHintTasks = lazypipe().pipe(jshint).pipe(jshint.reporter);
var jsMinifyTasks = jsHintTasks.pipe(jsMinify);
var jsTasks = jsMinifyTasks.pipe(gulp.dest,'dist');
gulp.task('jsCompress', function(){
  return gulp.src(['./src/**/*.js'])
  .pipe(jsTasks());
});

/*Concat css for pizza html*/
gulp.task('cssPizza', function(){
   return gulp.src('./src/views/css/*.css')
   .pipe(concat('all-styles-min.css'))
   .pipe(cssMinify())
   .pipe(gulp.dest('./dist/views/css/')); 
});

/*Compression Tasks for css main pages*/
var cssMinifyTasks = lazypipe().pipe(cssMinify).pipe(rename,{suffix: "-min"});
var cssTasks = cssMinifyTasks.pipe(gulp.dest, './dist/css/');
gulp.task('cssCompress', function(){
  return gulp.src(['./src/css/*.css'])
  .pipe(cssTasks());
});

/*Compression Tasks for images*/
var imgMinifyTasks = lazypipe().pipe(imageMin,{progressive: true, optimizationLevel:0, use: [pngQuant(0)]}).pipe(gulp.dest, 'dist');
gulp.task('imgCompress', function(){
  return gulp.src(['./src/**/*.jpg','./src/**/*.png'])
  .pipe(imgMinifyTasks());
});

/*Resize to 100 */
gulp.task('imgResize100', function(){
  return gulp.src(['./src/**/**/pizzeria.jpg'] )
  .pipe(imageResize({imageMagick: true, width : 480, quality: 0}))
  .pipe(rename({suffix : '-480'}))
  .pipe(gulp.dest('./src'));
});
/*Resize to 480*/
gulp.task('imageResize480', function(){
  return gulp.src(['./src/**/**/pizzeria.jpg'])
  .pipe(imageResize({imageMagick: true, width : 100, quality: .75}))
  .pipe(rename({suffix : '-100'}))
  .pipe(gulp.dest('./src'));
});

/*Resize to 300*/
gulp.task('imageResize300', function(){
  return gulp.src(['./src/**/**/pizzeria.jpg'])
  .pipe(imageResize({imageMagick: true, width : 300, quality: .5}))
  .pipe(rename({suffix : '-300'}))
  .pipe(gulp.dest('./src'));
});

/*Move html*/
// gulp.task('htmlMove', function(){
//   return gulp.src(['./src/**/*.html'])
//   .pipe(gulp.dest('dist'));
// });

gulp.task('htmlReplace', function(){
  return gulp.src('./src/**/*.html')
  .pipe(htmlReplace({
  'js-perf': {
    src: 'js/perfmatters',
    tpl: '<script src="%s-min.js"></script>'
  },
  jsMain: {
    src: 'main',
    tpl: '<script src="js/%s-min.js"></script>'
  },
  cssPrint: {
    src: 'css/print',
    tpl: '<link href="%s-min.css" rel="stylesheet" media="print">'
  },
  cssStyle: {
    src: 'css/style',
    tpl: '<link rel="stylesheet" href="./%s-min.css">'
  },
  pizzaCSS: {
    src: 'all-styles-min.css',
    tpl: '<link rel="stylesheet" href="./css/%s">'
  }
  }))
  .pipe(gulp.dest('dist'));
});

/*Set to watch changes in files and run appropriate tasks*/
gulp.task('watchJS', function(){
  gulp.watch(['./src/**/*.js'], ['jsCompress']);
});

gulp.task('watchCSS', function(){
  gulp.watch(['./src/**/*.css'], ['cssCompress']);
});

gulp.task('default',['jsCompress','cssCompress','cssPizza','imgResize100','imageResize300','imageResize480','imgCompress','htmlReplace']);
