'use strict';

var logger = require('./logger');

module.exports = function(app, opts) {

  var port = opts.port;

  var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('listening at http://%s:%s', host, port);
  });
};
