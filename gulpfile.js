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
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      jsonfile = require('jsonfile'),
      babel = require('gulp-babel'),
      debowerify = require("debowerify"),
      browserify = require('browserify'),
      browserSync = require('browser-sync').create();

  var fonts = jsonfile.readFileSync('dev/fonts/fonts.json');


  gulp.task('default', ['getFonts', 'getImages', 'buildSass', 'buildSassVendor', 'watch']);

  gulp.task('getFonts', function() {
    return gulp.src(fonts.path)
    .pipe(gulp.dest('prod/fonts/'));
  });

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

  // gulp.task('buildJs', function() {
  //   gulp.src([
  //     'dev/scripts/*.js',
  //     '!dev/scripts/vendor.js'
  //   ])
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //   .pipe(concat('main.js'))
  //   .pipe(babel({presets: ['es2015']}).on('error', gutil.log))
  //   .pipe(uglify().on('error', gutil.log))
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest('prod/js/'));
  // });
  //
  // gulp.task('buildJsVendor', function() {
  //   var vendor = browserify('./dev/scripts/vendor.js', {
  //     debug: false
  //   });
  //   vendor.transform(debowerify);
  //   vendor.bundle()
  //   .on('error', function (err) {
  //     gutil.log(gutil.colors.bold.red("Browserify error (Vendor)"), err.message);
  //     notifier.notify({title: "Browserify error (Vendor)", message: err.message });
  //     this.emit("end");
  //   })
  //   .pipe(source('vendor.js'))
  //   .pipe(buffer())
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest('prod/js/'));
  // });

  gulp.task('watch', function() {
    gulp.watch('dev/styles/main.scss', ['buildSass']);
    gulp.watch('dev/styles/vendor.scss', ['buildSassVendor']);
    // gulp.watch('dev/scripts/main.js', ['buildJs']);
    // gulp.watch('dev/scripts/vendor.js', ['buildJsVendor']);
    gulp.watch(fonts.path, ['getFonts']);
  });
}());
