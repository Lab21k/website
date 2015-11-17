'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	batch = require('gulp-batch'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass');

gulp.task('sass', function () {
	gulp.src('./app/sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'})
		  .on('error', sass.logError))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});

gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(gulp.dest('./public'))
		.pipe(livereload());
});

gulp.task('default', function() {
  livereload.listen();

	watch('app/sass/**/*.scss', batch(function(events, done){
		gulp.start('sass', done);
	}));

	watch('app/index.html', batch(function(events, done){
		gulp.start('html', done);
	}));
});
