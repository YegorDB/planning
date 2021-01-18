const { dest, parallel, src } = require('gulp');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify-es').default;


exports.base = function() {
  return src('src/plann/css/base.css')
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('output/plann/css/'));
}


exports.dialog = function() {
  return src('src/plann/css/dialog.css')
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('output/plann/css/'));
}


function tasksJS() {
  return browserify('src/plann/js/tasks/main.js')
    .bundle()
    .pipe(source('tasks.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/plann/js/'));
}


function tasksCSS() {
  return src('src/plann/css/tasks.css')
    .pipe(csso())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('output/plann/css/'));
}


exports.tasks = parallel(tasksJS, tasksCSS);
