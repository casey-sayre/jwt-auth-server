'use strict';

var logger = require('../app/logger');
var fs = require('fs');

if (process.argv.length !== 3) {
  logger.error('usage: "node hasher.js wordToHash"');
  process.exit();
}

var wordToHash = process.argv[2];

var salt = fs.readFileSync('../keys/salt.txt', 'utf8').trim();
logger.info('salt', salt);

var encrypt = require('../app/encrypt')({
  salt: salt
});

logger.info(wordToHash, encrypt(wordToHash));
