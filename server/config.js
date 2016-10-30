'use strict';
var merge = require('merge');
var fs = require('fs');

var env = process.env.APP_ENV || 'local';

var config = {
  default: {
    host: '0.0.0.0',
    port: '7101',
    env: env,
    assets_dir: '/apps/reactapp/dist',
    version: '0.0.1',
    logger: {
        level: 'debug',
        path: '/logs/reactapp/reactapp.log'
     },
    name: 'reactapp'
  },
  prod: {
    assets_dir: '/apps/reactapp/dist'
  },
  test: {

  },
  local: {
    port: 8888,
    assets_dir: './dist',
    meechum:
    {
      protocol: 'http://'
    },
    logger: {
        level: 'debug',
        path: './reactapp.log'
     }
  }
};

config = merge.recursive(true, config.default, config[env]); //recursive clone and merge
module.exports = config;
