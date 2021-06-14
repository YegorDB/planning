const { dest, parallel, src, watch } = require('gulp');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const less = require('gulp-less');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const touch = require('gulp-touch-custom');
const uglify = require('gulp-uglify-es').default;


function tasksJS() {
  return browserify('src/plann/js/tasks/main.jsx')
    .transform('babelify', {
      plugins: ['transform-react-jsx']
    })
    .bundle()
    .pipe(source('tasks.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/plann/js/'));
}


function tasksCSS() {
  return src('src/plann/less/tasks/main.less')
    .pipe(less())
    .pipe(csso())
    .pipe(rename('tasks.min.css'))
    .pipe(dest('output/plann/css/'))
    .pipe(touch());
}


exports.default = function() {
  watch('src/plann/js/tasks/**/*.(js|jsx)', tasksJS);
  watch('src/plann/less/tasks/**/*.less', tasksCSS);
};


exports.tasks = parallel(tasksJS, tasksCSS);
