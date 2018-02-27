/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var env = process.env.NODE_ENV || "development";
const options = {
    ops: {
        interval: 10000
    },
    reporters: {
	  myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
files:[{
  module: 'good-squeeze',
  name: 'Squeeze',
  args: [{ops: '*'}]
}, {
  module: 'good-squeeze',
  name: 'SafeJson',
  args: [{seperator: '\n'}]
}, {
  module: 'rotating-file-stream',
  args: ['logs.' +env + '.log', {
    path: './logs/', // base path
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: true // compress rotated files
  }]
}]
    }
};

var init = function (appconf) { 
    return  { 
        register:require("good"),
        options : options    
     };
}

module.exports =  function(conf){
    return init(conf);
}
