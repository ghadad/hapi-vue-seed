#!/usr/bin/node 
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
let Async = require("async");

let fs = require("fs");

let sqlite3 = require("sqlite3"); 
let db = new sqlite3.Database("../db/app.dev.db");
var stmt = db.prepare("INSERT INTO docs (md5,path,filename,keys ,batch_id)  VALUES (?,?,?,?,?)");
db.on("trace",function(log) { 
	console.log(log)
});


const md5 = require("md5") ;
const path = require('path');


let filedata = fs.readFileSync("./allfiles.txt",{encoding:"utf8"}) ;

let internal = {idx:0} ;
	
Async.waterfall([function(callback) {
	db.serialize(function() {
	 //db.run("drop table docs;");
         db.run("delete from sqlite_sequence where name='docs'");
         db.run("create table docs (id integer primary key autoincrement ,md5 text unique , path text , filename text,keys text,batch_id text)");
		callback(null,true)
	});
	}, 
	function(res,callback) {
db.serialize(function() {
		
        let data = filedata.split(/[\n\r]+/);
	console.log("Count : " ,data.length) ;
	data.forEach(f => { 
	if(f.length>10)  {
	//console.log("MD%:",md5(f));
	console.log("base:",path.basename(f)) 
	//console.log("dir:" , path.dirname(f)) 
	  internal.idx++;
	  stmt.run([md5(f),path.resolve(path.dirname(f)),path.basename(f),null,null],err => {
	      if(err) console.log(err)
	  });
	}
	});
	stmt.finalize();
	
	});
	callback(null,true)
	}],function(err,res) {
	db.get("select count(1) from docs",function(err,res) { 
		console.log("selected : ",res )
	})
	
	console.log("Count inserted : " ,internal.idx) ;
	});
	
