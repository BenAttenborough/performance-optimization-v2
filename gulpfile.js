/**
 * Created by ben on 26/10/2016.
 */

"use strict";

var sassDir = 'sass/',
    sassFile = 'style.scss',
    sassMain = sassDir.concat(sassFile),
    cssDir = 'css/',
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sassify = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('sassify', function () {
    return gulp.src([
            sassMain
        ])
        .on('error', swallowError)
        .pipe(maps.init())
        .pipe(sassify({outputStyle: 'compressed'}))
        .on('error', sassify.logError)
        .pipe(maps.write('./'))
        .pipe(gulp.dest(cssDir))
});

gulp.task("concatScripts", function () {
    return gulp.src([
            'js/lightbox.js'
        ])
        .on('error', swallowError)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
    return gulp.src(['js/app.js'])
        .pipe(maps.init())
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(rename('app.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
    gulp.watch(['sass/**/*.scss', 'sass/*.scss'], ['sassify']);
    gulp.watch('js/**', ['minifyScripts']);
});

gulp.task('build', ['minifyScripts'], function () {
    return gulp.src([
            'css/style.css*',
            'css/avatars.png',
            'css/avatarsLG.png',
            'img/**',
            'js/app.min.js*',
            '*.html'
        ],
        {base: './'})
        .pipe(gulp.dest('dist'))
});

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('default', function () {
    gulp.start('build');
});