'use strict';

var express = require('express')
var compression = require('compression')
var path = require('path')
var routes = require('./routes')
var config = require('./config')
var bodyParser = require('body-parser')
var logger = require('./logger')
var container = require('dependable').container();

/*eslint-disable no-console */

var app = express();
app.use(compression());
app.use(bodyParser.json());

app.get('/health', function (req, res) {
  res.send('Am healthy');
});

var p = path.join(__dirname, '../dist');
app.use(express.static(p));

routes.apply(app, container);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(config.port, function (err) {
	logger.log('%s listening at %s', config.name, config.host + ":" + config.port);
	if (err) {
		console.log(err);
	}
});

module.exports = app;
