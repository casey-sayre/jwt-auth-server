'use strict';

var gulp = require('gulp');
var server = require('gulp-develop-server');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var env = require('gulp-env');
var fs = require('fs');

var salt = fs.readFileSync('../keys/salt.txt', 'utf8').trim();
var listenOptions = {
  path: './index.js',
  env: {
    NODE_PORT: 5100,
    NODE_KEY_PATH: '../keys/id_rsa',
    NODE_SALT: salt,
    NODE_DB_PATH: '../db/auth',
    NODE_DB_VERBOSE: true
  }
};
livereload.options.port = 35730;

var serverFiles = [
  './*.js',
  '!./gulpfile.js'
];

gulp.task('startServer', function() {
  server.listen(listenOptions, livereload.listen);
});

gulp.task('default', ['lint', 'startServer'], function() {
  function restart(file) {
    server.changed(function(error) {
      if (!error) livereload.changed(file.path);
    });
  }
  gulp.watch(serverFiles, ['lint']).on('change', restart);
});

gulp.task('lint', function() {
  gulp.src('./*.js')
    .pipe(jshint('../.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
