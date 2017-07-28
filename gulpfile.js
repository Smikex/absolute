'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

const LESS_DIR = './web/less',
    CSS_DIR = './web/css',
    AUTOPREFIXER_RULES = [
        'last 10 versions'
    ];

var handleError = function (err) {
    gutil.beep();
    gutil.log(err);
    this.emit('end');
    gulp.src(err.filename)
        .pipe(notify({
            title: path.basename(err.filename) + ' (' + err.line + ':' + err.column + ')',
            message: err.message
        }));
};

gulp.task('less', function () {
    gulp.src(LESS_DIR + '/**/*')
        .pipe(plumber({errorHandler: handleError}))
        .pipe(less())
        .pipe(autoprefixer(AUTOPREFIXER_RULES))
        .pipe(gulp.dest(CSS_DIR));
});

gulp.task('watch', function () {
    gulp.watch(LESS_DIR + '**/*.less', ['less']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', [ 'less', 'watch', 'browser-sync' ]);
