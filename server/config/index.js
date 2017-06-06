'use strict';

let env = process.env.NODE_ENV || 'development';
let path = require("path") ;

let messages = require("./messages")

let defaults = {
  env: env,
  port: process.env.PORT || 8000,
  host: 'localhost',
  basepath:path.join(__dirname, '../../'),
  messages:messages
};

module.exports = Object.assign(defaults, require('./' + env + '.js') || {});