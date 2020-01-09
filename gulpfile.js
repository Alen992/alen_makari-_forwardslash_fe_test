// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const browserSync = require('browser-sync').create();
//gulp plugins
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

// npm install gulp gulp-sourcemaps gulp-sass gulp-concat gulp-uglify gulp-postcss autoprefixer cssnano gulp-replace

// File paths
const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('dist')) // put final CSS in dist folder
    .pipe(browserSync.stream());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
      files.jsPath
      //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
    ])
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              modules: false
            }
          ]
        ]
      })
    )
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Cachebust
var cbString = new Date().getTime();

function cacheBustTask() {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  watch(
    [files.scssPath, files.jsPath],
    series(parallel(scssTask, jsTask), cacheBustTask)
  );
  watch('./index.html').on('change', browserSync.reload);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(parallel(scssTask, jsTask), cacheBustTask, watchTask);

// npm install --save-dev gulp gulp-sourcemaps gulp-sass gulp-concat gulp-uglify gulp-postcss autoprefixer cssnano gulp-replace browser-sync gulp-babel gulp-plumber @babel/preset-env @babel/core