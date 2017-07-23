(function() {
  'use strict';

  var gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      concatCss = require('gulp-concat-css'),
      gutil = require('gulp-util'),
      notifier = require("node-notifier"),
      sass = require('gulp-sass'),
      imagemin = require('gulp-imagemin'),
      jsonfile = require('jsonfile');

  // var fonts = jsonfile.readFileSync('dev/fonts/fonts.json');

  gulp.task('default', ['getImages', 'buildSass', 'buildSassVendor', 'watch']);

  // gulp.task('getFonts', function() {
  //   return gulp.src(fonts.path)
  //   .pipe(gulp.dest('prod/fonts/'));
  // });

  gulp.task('getImages', function() {
    gulp.src([
      'dev/img/*',
      'dev/img/!*(.tmp)'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('prod/img'));
  });

  gulp.task('buildSass', function() {
    gulp.src([
      'dev/styles/**/[^_]*',
      '!dev/styles/vendor.scss'
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compact'}).on('error', function (err) {
      gutil.log(gutil.colors.bold.red('Sass compile error'), err.message);
      notifier.notify({title: "Sass compile error", message: err.message});
      this.emit('end');
    }))
    //.pipe(concatCss('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('prod/css/'));
  });

  gulp.task('buildSassVendor', function() {
    gulp.src('dev/styles/vendor.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compact'}).on('error', function (err) {
      gutil.log(gutil.colors.bgRed("Sass compile error (vendor)"), gutil.colors.bgBlue(err.message));
      notifier.notify({title: "Sass compile error (vendor)", message: err.message });
      this.emit("end");
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('prod/css/'));
  });

  gulp.task('watch', function() {
    gulp.watch('dev/styles/main.scss', ['buildSass']);
    gulp.watch('dev/styles/vendor.scss', ['buildSassVendor']);
    // gulp.watch(fonts.path, ['getFonts']);
  });
}());
