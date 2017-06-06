'use strict';


var myplugin = {
  register: function(server, options, next) {
    server.register(require("hapi-auth-cookie"), (err) => {
      const cache = server.cache({
        segment: 'sessions',
        expiresIn: 3 * 24 * 60 * 60 * 1000
      });
      server.app.cache = cache;

      server.auth.strategy('session', 'cookie', true, {
        password: 'password-should-be-32-characters',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: function(request, session, callback) {
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
