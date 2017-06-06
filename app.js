'use strict';

process.title = process.env.NODE_TITLE || 'No title'

const Hapi = require('hapi')
const Inert = require('inert')
const utils = require("./server/helpers/utils")



const server = new Hapi.Server();
server.app.config = require("./server/config")


server.connection({
  port: server.app.config.port,
  host: server.app.config.host,
  routes: {
    cors: true
  }
});

server.app.utils = utils

server.register(require("./server/plugins/webpackhmr")(server.app.config),
  function(err) {
    if (err) {
      throw err;
    }
  });

server.register([
  require("vision"),
  require("./server/plugins/docs")(server.app.config),
  require("./server/plugins/logger")(server.app.config), {
    register: require("./server/plugins/db"),
    options: server.app.config.db
  },
  require("./server/plugins/auth")
], function(err) {
  if (err) {
    console.log(err)
    throw err;
  } else {
    server.bind({
      db: server.app.db
    });
    server.route(require('./server/routes'));
  };
});



server.register([Inert], function(err) {

  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{filename*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 0, //(process.env.NODE_ENV == "production" ? 24 * 60 * 60 * 1000 : 0),
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public',
        listing: false,
        index: true
      }
    }
  });

  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
