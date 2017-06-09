var gulp = require('gulp'),
  path = require('path'),
  nodemon = require('gulp-nodemon');


// Run Nodemon and connect to BrowserSync
gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({

      // Nodemon the dev server
      script: 'app.js',

      // Watch core server file(s) that require restart on change
      watch: ['app.js', 'server/**/*.*']
    })
    .on('start', function onStart() {

      // Ensure only one call
      if (!called) {
        cb();
      }
      called = true;
    })
});


// BUILD

gulp.task('default', ['nodemon']);
