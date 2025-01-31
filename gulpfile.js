const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const terser = require('gulp-terser-js')

function css() {
  return src('source/styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/styles'))
}

function js() {
  return src('source/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/scripts'))
}

function images() {
  return src('source/images/*')
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest('build/images'))
}

function watchFiles() {
  watch("source/styles/**/*.scss", css)
  watch("source/scripts/**/*.js", js)
}

exports.css = css
exports.js = js
exports.images = images

exports.default = parallel(css, js, watchFiles)