var config = require('./config')
var fs = require('fs')
var minilog = require('minilog')


var logger = minilog('reactapp');

minilog.pipe(fs.createWriteStream(config.logger.path))
minilog.suggest.defaultResult = false;
minilog.pipe(minilog.backends.console.formatWithStack);

minilog
  .suggest
  .clear()
  .allow('reactapp', process.env.LOG_LEVEL || 'debug');
minilog.enable();

logger.log = logger.info;

module.exports = logger;
