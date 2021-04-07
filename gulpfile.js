// выбор
let preprocessor = "sass";
let subsyntax = "scss";
if (preprocessor == "less") {
  subsyntax = preprocessor;
}
// модули
const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const del = require("del");

// функции
// browserSync
function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" },
    notify: false,
    online: true,
  });
}
// browserSync
// скрипты
function scripts() {
  return (
    // src(["node_modules/jquery/dist/jquery.min.js", "app/js/app.js"])
    src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/shufflejs/dist/shuffle.min.js",
      //   галерея
      "app/js/libs/*.js",
      "app/js/user/*.js",
      "!app/**/*.min.js",
    ])
      .pipe(concat("app.min.js"))
      .pipe(uglify())
      .pipe(dest("app/js/"))
      // хард релоуд
      .pipe(browserSync.stream())
  );
}
// скрипты
// стили
function styles() {
  // src - берем что-то
  return (
    src(`app/${preprocessor}/main.${subsyntax}`)
      //   eval - имя из переменной как имя функции
      .pipe(eval(preprocessor)())
      .pipe(concat("app.min.css"))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 10 versions"],
          cascade: false,
          grid: true,
        })
      )
      .pipe(
        cleancss({
          level: { 1: { specialComments: 0 } } /*, format: "beautify"*/,
        })
      )
      .pipe(dest("app/css/"))
      .pipe(browserSync.stream())
  );
}
// стили
// удаляем картинки
function cleanimg() {
  return del("app/img/dest/**/*", { force: true });
}
// удаляем картинки
// удаляем dist
function cleandist() {
  return del("dist/**/*", { force: true });
}
// удаляем dist
// картинки
function images() {
  return (
    src("app/img/src/**/*")
      // .pipe(newer("app/img/dest/")) dont work
      .pipe(imagemin())
      .pipe(dest("app/img/dest/"))
  );
}
// картинки
// watch
function startWatch() {
  watch([`app/**/${preprocessor}/**/*.${subsyntax}`], styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
  watch(["app/img/src/**/*"], series(cleanimg, images));
}
// watch
// buildcopy
function buildcopy() {
  return src(
    [
      "app/css/**/*.min.css",
      "app/js/**/*.min.js",
      "app/img/dest/**/*",
      "app/img/svg/**/*",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}
// buildcopy
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buildcopy);
// дефолтный таск
exports.default = parallel(scripts, styles, images, browsersync, startWatch);
// parallel - комбинация различных задач на ОДНОВРЕМЕННОЕ ВЫПОЛНЕНИЕ
// exports - комбинация разных тасков
