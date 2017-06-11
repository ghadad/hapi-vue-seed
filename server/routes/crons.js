'use strict';
const Async = require('async');
const Promise = require("bluebird");
var FbCron = require('../cron/fb');

module.exports = [{
  method: ['get'],
  path: '/api/import/facebook/members',
  config: {
    auth: "session"
  },
  handler: function(request, reply) {
    if (request.auth.isAuthenticated) {
      Async.waterfall([
        (callback) => FbCron.import(request.auth.credentials.token, callback),
        (res, callback) => FbCron.filter(callback),
        (res, callback) => FbCron.insert(callback)
      ], (err, result) => {
        reply(result)
      });
    } else {
      reply("Not authisAuthenticated").code(401)
    }


  }
}];
