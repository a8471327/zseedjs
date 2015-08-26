var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');

// gulp.task('styles', function(){
// 	return gulp.src('sass/**/*.scss')
// 		.pipe(sass({style: 'extended'}))
// 		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
// 		.pipe(concat('zseed.css'))
// 		.pipe(gulp.dest('dist/css'))
// 		.pipe(rename({suffix: '.min'}))
// 		.pipe(minifycss())
// 		.pipe(gulp.dest('dist/css'))
// 		.pipe(notify({message: 'Styles task complete'}));
// });

gulp.task('styles', function(){
	return gulp.src('css/**/*.css')
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function(){
	return gulp.src('js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('zseed.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({message: 'Script task complete'}));
});

gulp.task('images', function(){
	return gulp.src('img/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
		})))
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({message: 'Images task complete'}));
});

gulp.task('clean', function(cb){
	del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});

gulp.task('default', ['clean'], function(){
	gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function(){
	gulp.watch('css/**/*.css', ['styles']);
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('img/**/*', ['images']);

	// Create LiveReload server
  	livereload.listen();
  	// Watch any files in dist/, reload on change
  	gulp.watch(['dist/**']).on('change', livereload.changed);
});

