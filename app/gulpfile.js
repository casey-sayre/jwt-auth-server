'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');
var jas = require('gulp-jasmine');
var nodemon = require('gulp-nodemon');
var nodeInspector = require('gulp-node-inspector');
var jshint = require('gulp-jshint');
var env = require('gulp-env');

gulp.task('set-env', function() {
  env({
    vars: {
      NODE_PORT: 5100,
      NODE_KEY_PATH: '../keys/foo',
      NODE_SALT: 'akajakq*%^qi',
      NODE_DB_PATH: '../db/auth',
      NODE_DB_VERBOSE: true
    }
  });
});

gulp.task('lint', function() {
  gulp.src('./*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('develop', ['lint', 'set-env'], function (done) {
  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: ['gulpfile.js'],
    tasks: ['lint']
  }).on('restart', function () {
    console.log('restarted!');
  });
  done();
});

gulp.task('debug', ['lint', 'set-env'], function (done) {
  return gulp.src('./server.js, *.js')
  	.pipe(nodeInspector());
});

gulp.task('test', ['lint'], function () {
	return gulp.src('spec/tool_spec.js')
  	// gulp-jasmine works on filepaths so you can't have any plugins before it
  	.pipe(jas());
});
