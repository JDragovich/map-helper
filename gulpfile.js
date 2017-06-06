const gulp = require('gulp');
const babel = require('gulp-babel');
const babelPreset = require('babel-preset-es2015');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('build', () => {
    return gulp.src('src/library.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
    return gulp.watch(['src/**/*.js'], ['build']);
});

gulp.task('default',['build']);
