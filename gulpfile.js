var gulp            = require('gulp');
var pug             = require('gulp-pug');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync').create();
var autoprefixer    = require('gulp-autoprefixer');
var cleanCSS        = require('gulp-clean-css');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 5 versions'],//last 2 versions
			cascade: true
		}))
    .pipe(cleanCSS({compatibility: 'ie8'}))//, keepSpecialComments : 0
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


//Pug
gulp.task('pug', function buildHTML() {
  return gulp.src('./pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
});


// Static Server + watching scss/html files
gulp.task('default', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./pug/**/*.pug", ['pug']);
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});
