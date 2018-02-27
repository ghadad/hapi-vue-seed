'use strict';
const Async = require('async');
const Promise = require("bluebird");
var FbCron = require('../cron/fbimport');


module.exports = [{
  method: ['get'],
  path: '/api/import/facebook/members',
  config: {
    auth: "session"
  },
  handler:  async function(request, reply) {
    if (request.auth.isAuthenticated) {
	console.log("user token ",request.auth.credentials.token);
        await FbCron.run(request.auth.credentials.token)
	reply("Job done");
    } else {
      reply("Not authisAuthenticated").code(401)
    }
  }
}];
