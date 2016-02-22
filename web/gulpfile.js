var gulp = require('gulp')


gulp.task('default', ['assets'])

gulp.task('assets', () => {
    return gulp.src('src/assets/favicon/*')
               .pipe(gulp.dest('dist/assets/favicon'))
})
