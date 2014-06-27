var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var combine = require('stream-combiner');

gulp.task('less', function() {
  var combined = combine(
    gulp.src('less/style.less'),
    less(),
    gulp.dest('css')
  );

  // catch errors and prevent stream throw
  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/combining-streams-to-handle-errors.md
  combined.on('error', function(err) {
    console.warn(err.message);
  });

  return combined;
});

gulp.task('copy', function() {
  gulp
    .src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/zxcvbn/zxcvbn.js'
    ])
    .pipe(gulp.dest('js/lib/'));
});

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less']);

  var server = livereload();
  gulp.watch('css/**').on('change', function(file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['build']);
gulp.task('build', ['less', 'copy']);
