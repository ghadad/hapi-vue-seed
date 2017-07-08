#!/usr/bin/node

const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const mkdirp = require("mkdirp");
const md5 = require("md5");
const async = require("async");
let sqlite3 = require("sqlite3");
const sharp = require("sharp");


if (!process.env.BATCH_ENV) {
  console.error("Please export BATCH_ENV variable !");
  process.exit();
}
let env = process.env.BATCH_ENV;

let config = {
  uploadDir: "/home/golanh/hapi-teachers/upload/" + env,
  db: new sqlite3.Database('/home/golanh/hapi-teachers/db/app.' + env + '.db')
};


let db = config.db;

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});


db.on("trace", function(log) {
 // console.log(log)
});

let data = {};


db.all("select * from docs", function(err, files) {
      files.forEach((f) => { 
      if (f.filename.match(/(jpg|jpeg|png|bmp|gif|svg)$/i)) {
      let imageFullname = path.resolve(f.path, f.filename);
      let thumbDir = path.resolve(f.path, "thumbs")
      let thumbFullname = path.resolve(f.path, "thumbs", f.filename)
      if (!fs.existsSync(thumbDir)) {
        mkdirp.sync(thumbDir)
      }
       sharp(imageFullname)
        .resize(200, 200)
        .toFile(thumbFullname, function(err) {
         	if(err) console.log(err);
		console.log(imageFullname,thumbFullname);
        });


}})
  async.each([], (f, callback) => {
    if (f.filename.match(/(jpg|jpeg|png|bmp|gif|svg)$/i)) {
      let imageFullname = path.resolve(f.path, f.filename);
      let thumbDir = path.resolve(f.path, "thumbs")
      let thumbFullname = path.resolve(f.path, "thumbs", f.filename)
      if (!fs.existsSync(thumbDir)) {
        mkdirp.sync(thumbDir)
      }
      Jimp.read(imageFullname).then(function(img) {
	console.log(imageFullname , thumbFullname);
        img.resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .write(thumbFullname); // save
      }).catch(function(err) {
        callback(err);
      })
    }
  }, function done(err) {
    if(err) console.log(err)
  });
});
