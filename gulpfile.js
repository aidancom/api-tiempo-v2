const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');

// Ruta de archivos
const scssPath = 'src/css/**/*.scss';
const cssDest = 'src/css';

// Tarea para compilar SASS
function compileSass() {
  return gulp.src(scssPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
}

// Tarea para observar cambios
function watchFiles() {
  gulp.watch(scssPath, compileSass);
}

// Tareas disponibles
exports.sass = compileSass;
exports.watch = watchFiles;
exports.default = gulp.series(compileSass, watchFiles);
exports.build = compileSass;
