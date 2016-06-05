'use strict';

var logger = require('./logger');

logger.info('startup');

var config = {
  keyPath: process.env.NODE_KEY_PATH,
  salt: process.env.NODE_SALT,
  databasePath: process.env.NODE_DB_PATH,
  databaseVerbose: process.env.NODE_DB_VERBOSE,
  port: process.env.NODE_PORT
};

var express = require('express');
var app = express();
var router = express.Router();

var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors()); // NOTE cors from anywhere
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var login = require('./login');
router.post('/login', login(config));

app.use(router);

require('./server')(app, config);
