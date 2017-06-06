/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict' ;
const path = require('path');
const Hoek = require("hoek");

let internals =  {} ;
require('fs').readdirSync(__dirname + path.sep).forEach(function(file) {
  if (file.match(/\.json$/) !== null && file !== 'index.js') {
       let  conf =  require('./' + file);
       let module = file.replace('.json', ''); 
       internals[module] = conf ;
  }
});

let get = (...args) =>  {  
        
        let lookup   = ""
        let term = "";
        let Def = null ;
        if(args.length==1) {
            term = args[0];
        } else if(args.length>=2)  {
            term = args[0];
            Def = args[1];
        } 

        return Hoek.reach(internals,term,{default:Def});
    
    } ;




module.exports = { 
        data : internals ,
        get : get 
}
