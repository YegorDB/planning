const { src, dest } = require('gulp');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


exports.tasks = function() {
  return browserify('src/plann/js/tasks/main.js')
    .bundle()
    .pipe(source('tasks.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/plann/js/'));
}
