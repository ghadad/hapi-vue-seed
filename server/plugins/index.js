'use strict';


function init(appconf) {
    var internals = [];
    require('fs').readdirSync(__dirname + '/').forEach(function (file) {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            var name = file.replace('.js', '');
             console.log(file,name);
            var modconf = require('./' + name).init(appconf);
           //
            if (modconf instanceof  Array) {
                modconf.forEach(c => {
                    internals.push(c);
                })
            } else {
                internals.push(modconf);
            }
        }
    });
    console.log("AAAAA" ,internals)
    return internals;
}

module.exports = {
    init:init
}


