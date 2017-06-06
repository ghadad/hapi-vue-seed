
var options = {
    
}

var init = function (appconf) {
    const Hapidocs = require('lout');
       return {
        register: Hapidocs,
        options: options
    }

};

module.exports = function (conf) {
    return init(conf);
}