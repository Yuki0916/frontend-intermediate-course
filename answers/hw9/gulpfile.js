var gulp = require('gulp');
var inline = require('gulp-inline');
var uglify = require('gulp-uglify');

gulp.task('run', function(){
	gulp.src('index.html')
  .pipe(inline({
    base: 'public/',
    js: function() {
      return uglify({
          mangle: true
      });
    }
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', []);