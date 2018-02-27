'use strict';
var sqlite3 = require('sqlite3');

var myplugin = {
  register: function(server, options, next) {
    console.log(options.storage)
    var db = new sqlite3.Database(options.storage);
    console.log(db)
    server.bind({
      db: db
    });
    server.app.db = db;
    next()
  }
}

myplugin.register.attributes = {
  name: 'db',
  version: '1.0.0',
}

module.exports = myplugin
