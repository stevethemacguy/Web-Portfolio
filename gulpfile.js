/**
 * Author: Steven Dunn
 * Date Created: May 15, 2017
 * Dependencies: Gulp.js
 */

//Use gulp. Require is just the way to include dependencies.
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var less= require('gulp-less');
var inject = require('gulp-inject');
var minifycss = require('gulp-minify-css');
var merge = require('merge-stream');
var mergeStream = require('merge-stream');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
//var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//var spritesmith = require('gulp.spritesmith');
//var svgSprite = require('gulp-svg-sprite');



//You run this right away. It goes through ALL the modules in the node-modules folder and attaches a reference to
//them on plug. For example: plug.ng-annotate. This makes it so you never have to type in "require('whatever plugin')"
//again! You can just say plug.whatever
//var plug = require('gulp-load-plugins')();

//Use ALL JS files in the project as our source files (i.e. starting files that we'll then process with Gulp.
var sourceFiles = [
    './css/client/app/**/*module*.js',
    './src/client/app/**/*.js',
    '!./src/client/app/**/{,/**-spaghetti.js}'
];

gulp.task('hint', function() {
    return gulp
        .src(source)
        .pipe(plug.jshint('./.jshintrc')) //run through jshint
        .pipe(plug.jshint.reporter('jshint-stylish')); //format output from jshint
});

gulp.task('less', function() {
    return gulp.src('./css/less/**/*.less')
        //.pipe(sourcemaps.init())
        .pipe(less({
            verbose: true,
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: {
            baseDir: "./",
            index: "dev.html"  //Use dev.html while developing instead of index.html
        }
    });

    gulp.watch("css/**/*.less", ['less']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

/*
gulp.task('watch', function() {
    return gulp
        .watch(source, ['hint']) //Watch files and run the hint task any time a file changes
        .on('change', function(event) {
            console.log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
*/

/*gulp.task('watch', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('css/!**!/!*.less', function () {
        gulp.src('css/!**!/!*.less')
        .pipe(less())
    });
});*/

gulp.task('default', ['serve']);














