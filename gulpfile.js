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
    spritesmith = require('gulp.spritesmith'),

    buffer = require('vinyl-buffer'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream'),

    del = require('del');

gulp.task('sassify', function () {
    return gulp.src([
            sassMain
        ])
        .pipe(maps.init())
        .pipe(sassify({outputStyle: 'compressed'}))
        .on('error', sassify.logError)
        .pipe(maps.write('./'))
        .pipe(gulp.dest(cssDir))
});

gulp.task('createSprites', function () {
    var spriteData = gulp.src('img/sprites/*.jpg')
        .pipe(spritesmith({
            imgName: 'avatars.png',
            cssName: 'spriteCSS.css'
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('css/'));

    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest('sass/containers/'))
        .pipe(rename('_sprite.scss'));
    return merge(imgStream, cssStream);
    //return spriteData.pipe(gulp.dest('img/sprites/'))
});

gulp.task('sprite', ['createSprites'], function () {
    return gulp.src([
            'sass/containers/spriteCSS.css'
        ])
        .pipe(rename('_sprite.scss'))
        .pipe(gulp.dest('sass/containers/'))
});

//gulp.task('clean', function() {
//    return gulp.src([
//        'css/*',
//        'js/*',
//    ])
//});

gulp.task("concatScripts", function () {
    return gulp.src([
            'js/jquery.js',
            'js/fastclick.js',
            'js/foundation.js',
            'js/foundation.equalizer.js',
            'js/foundation.reveal.js',
            'js/scripts.js'
        ])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
    return gulp.src(['js/app.js'])
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('watch', function () {
    gulp.watch(['sass/**/*.scss', 'sass/*.scss'], ['sassify']);
    gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('build', ['minifyScripts'], function () {
    return gulp.src([
            'css/style.css*',
            'css/avatars.png',
            'img/**',
            'js/**',
            '*.html'
        ],
        {base: './'})
        .pipe(gulp.dest('dist'))
});

gulp.task('default', function () {
    gulp.start('build');
});