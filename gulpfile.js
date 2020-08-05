const { series, src, dest, watch } = require("gulp");
const htmlClean = require("gulp-htmlclean");
const gulpLess = require("gulp-less");
const autoCss = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const cleanDeBug = require("gulp-strip-debug");
const minJs = require("gulp-uglify");
const imgMin = require("gulp-imagemin");
const connect = require('gulp-connect');
const folder = {
  src: "src/",
  dist: "dist/",
};

function html() {
  return src(folder.src + "html/*")
    .pipe(htmlClean())
    .pipe(dest(folder.dist + "html/"))
    .pipe(connect.reload());
}

function css() {
  return src(folder.src + "css/*")
    .pipe(gulpLess())
    .pipe(autoCss())
    .pipe(cleanCss())
    .pipe(dest(folder.dist + "css/"))
    .pipe(connect.reload());
}

function js() {
  return src(folder.src + "js/*")
    // .pipe(cleanDeBug())
    .pipe(minJs())
    .pipe(dest(folder.dist + "js/"))
    .pipe(connect.reload());
}

function image() {
  return src(folder.src + "images/*")
    .pipe(imgMin())
    .pipe(dest(folder.dist + "images/"));
}

function server () {
    connect.server({
        port: '1534',
        livereload: true
    })
}

watch(folder.src + 'html/*', (cb) => {
    html();
    cb();
})
watch(folder.src + 'css/*', (cb) => {
    css();
    cb();
})
watch(folder.src + 'js/*', (cb) => {
    js();
    cb();
})

exports.default = series(html, css, js, image, server);
