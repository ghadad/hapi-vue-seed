#!/usr/bin/node 
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

let sqlite3 = require("sqlite3"); 
let db = new sqlite3.Database("../db/app.dev.db");
const md5 = require("md5") ;
const path = require('path');
var exec = require('child_process').exec;
// executes `pwd`
function puts(error, stdout, stderr) { 
	db.serialize(function() {
		db.run("drop table docs;");
		db.run("create table docs (id integer primary key autoincrement ,md5 text unique , path text , filename text,keys text,batch_id text)");
		var stmt = db.prepare("INSERT INTO docs (md5,path,filename,keys ,batch_id)  VALUES (?,?,?,?,?)");
		stdout.split("\n").forEach(f => { 
			console.log("MD%:",md5(f));
			console.log("base:",path.basename(f)) 
			console.log("dir:" , path.dirname(f)) 
			stmt.run([md5(f),path.resolve(path.dirname(f)),path.basename(f),null,null],err => { console.log(err) });
		});
	
	 stmt.finalize();
	});
	}
exec("find `pwd`/../data   -type f", puts);
