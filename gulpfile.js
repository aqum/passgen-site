var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('copy', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/zxcvbn/zxcvbn-async.js',
    'bower_components/zxcvbn/zxcvbn.js'
  ])
    .pipe(gulp.dest('dist/js/lib/'));
  gulp.src('js/**/*.js')
    .pipe(gulp.dest('dist/js/'));
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['build']);
gulp.task('build', ['copy']);
