'use strict';


var myplugin = {
  register: function(server, options, next) {
    server.register([require("hapi-auth-cookie"),require("bell")], (err) => {
      const cache = server.cache({
        segment: 'sessions',
        expiresIn: 3 * 24 * 60 * 60 * 1000
      });
      server.app.cache = cache;

      server.auth.strategy('session', 'cookie', true, {
        password: 'password-should-be-32-characters',
        cookie: 'sid-example',
      //  redirectTo: '/#/login',
        isSecure: false,
      /*  validateFunc: function(request, session, callback) {
          cache.get(session.sid, (err, cached) => {
            if (err) {
              return callback(err, false);
            }
            if (!cached) {
              return callback(null, false);
            }
            return callback(null, true, cached.account);
          });
        }
        */
      });
      console.log(options.facebook)
      server.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        password: 'cookie_encryption_password_secure',
        clientId: options.facebook.clientId ,  //'436625946698541',
        scope: ['email','public_profile'],
        clientSecret: options.facebook.clientSecret , //'8f9dacda5278963b4ebe9a12800f8797',
        isSecure: false , // Terrible idea but required if not using HTTPS especially if developing locally,
        location: server.info.uri
      });


      server.ext({
          type: 'onRequest',
          method: function (request, reply) {

              //console.log(request)
              return reply.continue();
          }
      });

      server.route({
     method: 'get',
      path: '/api/facebook/login',
      config: {
        cors :true,
        auth: {
          strategy: "facebook",
          mode: "try"
        }
      },
      handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(request.auth.credentials);
           return reply.redirect('http://eduil.tk:3000/#/login')
         }
         return reply('Authentication failed due to: ' + request.auth.error.message);
      }
    });

    server.route({
    method: ['get'],
    path: '/api/facebook/profile',
    config: {
      auth: {
        strategy: "session",
    }
    },
    handler: function(request, reply) {
      if (request.auth.isAuthenticated) {
        console.log(request.auth.credentials)
        return reply(request.auth.credentials.profile);
      }
      return reply('Not logged in...').code(401);
    }
  });

  server.route({
    method: ['get'],
    path: '/api/facebook/logout',
    config: {
      auth:false
    },
    handler: function(request, reply) {
      request.cookieAuth.clear();
       return reply.redirect('/');
    }
  });



      next()
    });
  }
}



myplugin.register.attributes = {
  name: 'auth',
  version: '1.0.0',
}

module.exports = myplugin
