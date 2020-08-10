/*
 * Created by Sergio on 02.12.2019.
 */

/*=========== GULP + Plugins init ==============*/
let browserSync = require('browser-sync'),
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify');

// Local Server
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });
});

// Custom Styles
gulp.task('scss', function () {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    ) //compressed
    .pipe(concat('style.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 11',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      })
    )
    .pipe(gulp.dest('app/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('css', function () {
  return gulp
    .src(['node_modules/normalize.css/normalize.css'])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('html', function () {
  return gulp.src('app/*.html').pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task('script', function () {
  return gulp.src('app/js/*.js').pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task('js', function () {
  return gulp
    .src(['node_modules/jquery/dist/jquery.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Watch
gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task(
  'default',
  gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch')
);
