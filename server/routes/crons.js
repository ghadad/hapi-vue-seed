'use strict';

var FbCron = require('../cron/fb');

module.exports = [{
        method: ['get'],
        path: '/api/import/facebook/members',
        config : {auth:"session"},
        handler: function(request,reply) {
        if(request.auth.isAuthenticated) {
          FbCron.setAccessToken(request.auth.credentials.token);
          FbCron.import((res) => {
            reply  (res);
          })

        }  else{
          reply("Not authisAuthenticated").code(401)
        }


    }
  }
];
