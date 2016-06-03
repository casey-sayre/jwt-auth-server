'use strict';

var jwt = require('jsonwebtoken');
var fs = require('fs');
var logger = require('./logger');

var encrypt = function(password, salt) {
  var crypto = require('crypto');
  return crypto.createHmac('sha1', salt)
      .update(password)
      .digest('hex');
};

module.exports = function(opts) {

  return function(req, res, next) {

    var databasePath = opts.databasePath;
    var databaseVerbose = opts.databaseVerbose;
    var keyPath = opts.keyPath;
    var salt = opts.salt;

    var sqlite3 = require('sqlite3');
    if (databaseVerbose) sqlite3.verbose();
    var db = new sqlite3.Database(databasePath);
    var givenUsername = req.body.username;
    var qry = 'select * from users where username="' + givenUsername + '"';
    var authUser = null;
    db.get(qry, function(error, row) {
      authUser = row;
      db.close();
      if (error) {
        return res.status(500).json({error:error, message: 'authenticateServer received sqlite3 error'});
      }
      if (!authUser) {
        return res.status(401).json({
          user: req.body.username,
          error: 'unknown user'
        });
      }
      var givenPassword = encrypt(req.body.password, salt);
      if (givenPassword !== authUser.password) {
        return res.status(401).json({
          user: req.body.username,
          error: 'password incorrect'
        });
      }
      var cert = fs.readFileSync(keyPath);
      var token = jwt.sign({
        username: req.body.username
      }, cert, {algorithm: 'RS256'});
      res.json({
        username: req.body.username,
        token: token
      });
    });
  };
};
