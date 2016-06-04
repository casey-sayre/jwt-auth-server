'use strict';

var crypto = require('crypto');

module.exports = function(opts) {
  var salt = opts.salt;
  return function(password) {
    return crypto.createHmac('sha1', salt)
        .update(password)
        .digest('hex');
  };
};
