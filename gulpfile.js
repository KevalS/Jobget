var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  //compass = require('gulp-compass'),
  prettify = require('gulp-jsbeautifier'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  templateCache = require('gulp-angular-templatecache'),
  jsbeautifyFolder = function(folderPath) {
    gulp.src(folderPath + '*.js')
      .pipe(plumber())
      .pipe(prettify({
        js: {
          indentSize: 2
        }
      }))
      .pipe(gulp.dest(folderPath));
  };

gulp.task('compass', function() {
 gulp.src('./client/assets/sass/*.scss')
   .pipe(plumber())
   .pipe(compass({
     css: 'public/css',
     sass: 'client/assets/sass',
     image: 'public/images',
     image: 'public/scripts'
   }))
   .pipe(minifyCSS())
   .pipe(gulp.dest('./public/css'))
   .pipe(gulp.dest('./public/scripts'))
   .pipe(livereload());
});

gulp.task('jsbeautify', function() {
  jsbeautifyFolder('./app/models/');
  jsbeautifyFolder('./app/helpers/');
  jsbeautifyFolder('./app/dbhelpers/');
  jsbeautifyFolder('./app/controllers/');
  jsbeautifyFolder('./client/controllers/');
  jsbeautifyFolder('./client/directives/');
  jsbeautifyFolder('./client/services/');
  jsbeautifyFolder('./client/filters/');
});

gulp.task('jscompress', function(callback) {
  return gulp.src([
      './client/main.js',
      './client/controllers/*.js',
      './client/directives/*.js',
      './client/services/*.js',
      './client/filters/*.js',
      './client/templates/templates.js',
    ], {
      base: './client/'
    })
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('templateCache', function() {
  return gulp.src('./client/templates/*.html')
    .pipe(templateCache('templates.js', {
      module: 'jobget'
    }))
    .pipe(gulp.dest('client/templates/'));
});

gulp.task('watch', function() {
  //gulp.watch('./client/assets/sass/*.scss', ['compass']);
  gulp.watch([
    './client/main.js',
    './client/controllers/*.js',
    './client/directives/*.js',
    './client/services/*.js',
    './client/filters/*.js',
    './client/templates/templates.js'
  ], ['jscompress']);
  gulp.watch('./client/templates/*.html', ['templateCache']);
});

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee handlebars',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', function() {
    setTimeout(function() {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'develop',
  'watch'
]);

gulp.task('build', [
  //'compass',
  'templateCache',
  'jscompress',
]);
