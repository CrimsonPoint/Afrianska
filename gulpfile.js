const {src, dest, series, watch} = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require("gulp-notify");
const sourceMaps = require('gulp-sourcemaps');



const styles = () => {
    return src("src/css/**/*.css")
        .pipe(sourceMaps.init())
        .pipe(concat("style.css"))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(sourceMaps.write())
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src("src/**/*.html")
        .pipe(sourceMaps.init())
        .pipe(htmlMin({
            collapseWhitespace:true
        }))
        .pipe(sourceMaps.write())
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/img/icons/**/*.svg', svgSprites)
        .pipe(sourceMaps.init())
        .pipe(svgSprite({
            mode:{
                stack:{
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(sourceMaps.write())
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/**/*.svg',
        'src/img/**/*.webp'
    ])
    .pipe(image())
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('add.js'))
    .pipe(uglify({
        toplevel: true
    }).on('error', notify.onError()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const resourses = () => {
    return src('src/resourses/**')
        .pipe(dest('dist'))
}
const fonts = () => {
    return src('src/fonts/*.woff')
        .pipe(dest('dist/fonts'))
}
const ico = () => {
    return src('src/img/icons/*.ico')
        .pipe(dest('dist/img/icons'))
}

const clean = () =>{
    return del('dist')
}

const watchFile = () => {
    browserSync.init({
        server:{
            baseDir:'dist'
        }
    });
}
watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.css', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch([
    'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/**/*.svg',
        'src/img/**/*.webp'
], images)
watch('src/js/**/*.js', scripts);
watch('src/resourses/**', resourses);
watch('src/fonts/*.woff', fonts);
watch('src/img/icons/*.ico', ico);

exports.default = series(clean, styles, htmlMinify, scripts, svgSprites, images, resourses, fonts, ico, watchFile);