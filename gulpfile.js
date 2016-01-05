var gulp = require('gulp'),
    gulpWebServer = require('gulp-webserver'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var scriptToLoad = [
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.js'
],
src = {
    ts: './src/**/*.ts',
    sass: ['./src/style/style.scss', './src/style/style.sass', './src/style/*.scss'],
    html: './src/**/*.html'
},
dest = {
    sass: './public/css',
    js: './public/js',
    html: './public'
},
tsProject = ts.createProject('tsconfig.json');

// CLEAN TASK
gulp.task('clean:sass', function () {
    return gulp.src('./public/css/*', {read: false})
        .pipe(clean());
});

gulp.task('clean:tsc', function () {
    return gulp.src('./public/app/*', {read: false})
        .pipe(clean());
});

gulp.task('clean:html', function () {
    return gulp.src('./public/**/*.html', {read: false})
        .pipe(clean());
});

// RUN SERVER
gulp.task('serve', function() {
  return gulp.src('./public')
    .pipe(gulpWebServer({
        host: '127.0.0.1',
        livereload: true,
        directoryListing: false,
        open: true
    }));  
});

// COMPILE TYPESCRIPT TO JAVASCRIPT
gulp.task('tsc', ['clean:tsc'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest('./public/app'));
});

// COMPILE SASS TO CSS
gulp.task('sass', ['clean:sass'], function() {
  return gulp.src(src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(dest.sass));
});

// MOVE HTML 
gulp.task('html', ['clean:html'], function () {
  return gulp.src(src.html)
    .pipe(gulp.dest(dest.html));  
});

gulp.task('concatJs', function(){
  return gulp.src(scriptToLoad)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});

gulp.task('watch', ['tsc', 'sass', 'html', 'concatJs'], function(){
  gulp.watch(src.ts, ['tsc']);
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.html, ['html']);
});

gulp.task('default', ['watch'], function () {
    gulp.start('serve');
});