const { dest, parallel, src, watch } = require('gulp');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const less = require('gulp-less');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const touch = require('gulp-touch-custom');
const uglify = require('gulp-uglify-es').default;


function getJSHandler(app, path) {
  return function() {
    return browserify(`src/${app}/js/${path}/main.jsx`)
      .transform('babelify', {
        plugins: ['transform-react-jsx']
      })
      .bundle()
      .pipe(source(`${path}.js`))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(dest(`output/${app}/js/`));
  }
}

let taskJS = getJSHandler('plann', 'task');
let tasksJS = getJSHandler('plann', 'tasks');


function getCSSHandler(app, path) {
  return function() {
    return src(`src/${app}/less/${path}/main.less`)
      .pipe(less())
      .pipe(csso())
      .pipe(rename(`${path}.min.css`))
      .pipe(dest(`output/${app}/css/`))
      .pipe(touch());
  }
}

let taskCSS = getCSSHandler('plann', 'task')
let tasksCSS = getCSSHandler('plann', 'tasks')


exports.default = function() {
  watch('src/base/js/base/base.jsx', parallel(taskJS, tasksJS));
  watch('src/plann/js/task/**/*.(js|jsx)', taskJS);
  watch('src/plann/less/task/**/*.less', taskCSS);
  watch('src/plann/js/tasks/**/*.(js|jsx)', tasksJS);
  watch('src/plann/less/tasks/**/*.less', tasksCSS);
};


exports.task = parallel(taskJS, taskCSS);
exports.tasks = parallel(tasksJS, tasksCSS);
