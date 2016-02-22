var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
 
gulp.task('default', ['sass', 'sass:watch'], function() {
  
});
 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webpack', function() {
  return gulp.src('./app/SipIt.ts')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./'));
});