'use strict';

var jwt = require('jsonwebtoken');
var fs = require('fs');
var util = require('util');
var logger = require('./logger');

module.exports = function(opts) {

  var usersQryString = util.format('select %s from users where username=?', [
    'username',
    'password',
    'admin',
    'changePasswordNow'
  ].join(','));

  var databasePath = opts.databasePath;
  var databaseVerbose = opts.databaseVerbose;
  var keyPath = opts.keyPath;

  var encrypt = require('./encrypt')(opts);

  var cert = fs.readFileSync(keyPath);

  return function(req, res, next) {

    var sqlite3 = require('sqlite3');
    if (databaseVerbose) sqlite3.verbose();
    var db = new sqlite3.Database(databasePath);
    var givenUsername = req.body.username;
    var authUserRecord = null;
    db.get(usersQryString, givenUsername, function(error, row) {
      authUserRecord = row;
      db.close();
      if (error) {
        logger.error(error);
        return res.status(500).json({
          error: 'authenticationServer received sqlite3 error'
        });
      }
      if (!authUserRecord) {
        return res.status(401).json({
          user: givenUsername,
          error: 'unknown user'
        });
      }
      var givenPassword = encrypt(req.body.password);
      if (givenPassword !== authUserRecord.password) {
        return res.status(401).json({
          user: givenUsername,
          error: 'password incorrect'
        });
      }
      var payload = {
        username: givenUsername
      };
      var token = jwt.sign(payload, cert, {algorithm: 'RS256'});
      res.json({
        username: givenUsername,
        token: token
      });
    });
  };
};
