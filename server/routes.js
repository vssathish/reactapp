var
    curl = require('curlrequest'),
    request = require('request'),
    moment = require('moment'),
    querystring = require('querystring'),
    _ = require('lodash'),
    url = require('url'),
    cookie = require('cookie'),
    request = require('request'),
    util = require('util'),
    NodeCache = require('node-cache'),
    errors = require('restify-errors'),
    config = require('./config'),
    logger = require('./logger'),
    gpg = require('gpg');


module.exports = {
    apply: function(app, container) {

        app.get('/api/v1/hello', function(req, res, next){

            res.status(200).send('Hello');
            next();

        })


    }

}
