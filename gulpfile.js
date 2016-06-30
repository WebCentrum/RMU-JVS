var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss'
];


gulp.task('default', ['sass, js'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
});

gulp.task('build', ['iconfont', 'sass', 'js-concat', 'js'], function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
});


// SASS compilation
gulp.task('sass', function() {
  return gulp.src('assets/scss/main.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});


// JS compilation
gulp.task('js', function() {
	return gulp.src('assets/js/app.js')
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('js/'));
});


// JS plugins concatenation
var jsConcatFiles = [
  './bower_components/what-input/what-input.js',

  './bower_components/foundation-sites/js/foundation.core.js',
  './bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
  './bower_components/foundation-sites/js/foundation.util.box.js',
  './bower_components/foundation-sites/js/foundation.util.keyboard.js',
  './bower_components/foundation-sites/js/foundation.util.motion.js',
  './bower_components/foundation-sites/js/foundation.util.nest.js',
  './bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js',
  './bower_components/foundation-sites/js/foundation.util.triggers.js',
  './bower_components/foundation-sites/js/foundation.accordionMenu.js',
  './bower_components/foundation-sites/js/foundation.dropdownMenu.js',
  './bower_components/foundation-sites/js/foundation.tabs.js',
  './bower_components/foundation-sites/js/foundation.toggler.js'
];

gulp.task('js-concat', function() {
  return gulp.src(jsConcatFiles)
    .pipe($.concat('libraries.js'))
    .pipe(gulp.dest('js/'));
});


// Iconfont generator
var runTimestamp = Math.round(Date.now()/1000);
var iconfontName = 'iconfont';

gulp.task('iconfont', function(){
  return gulp.src(['assets/iconfonts/*.svg'])
    .pipe($.iconfontCss({
      fontName: iconfontName,
      path: 'scss',
      targetPath: '../scss/front/iconfont.scss',
      fontPath: '../fonts/'
    }))
    .pipe($.iconfont({
      fontName: iconfontName,
      formats: ['ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp,
      normalize: true,
      fontHeight: 256
    }))
    .pipe(gulp.dest('fonts/'));
});
