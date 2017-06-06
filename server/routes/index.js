'use strict';

var internals = [];
require('fs').readdirSync(__dirname + '/').forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        var conf = require('./' + name);
        if (conf instanceof Array) {
            conf.forEach(c => {
                internals.push(c);
            })
        } else {
            internals.push(require('./' + name));
        }
    }
});


if (process.env.NODE_ENV === 'development') {

    internals = internals.concat(require('./mock'));
}


module.exports = internals;