#!/usr/bin/node

const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const mkdirp = require("mkdirp");
const md5 = require("md5");
const async = require("async");
let sqlite3 = require("sqlite3");
let db = new sqlite3.Database("../db/app.prod.db");

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});


db.on("trace", function(log) {
  console.log(log)
});

let data = {};

db.all("select * from docs", function(err, files) {
  async.each(files, (f, callback) => {
    if (f.filename.match(/(jpg|jpeg|png|bmp|gif|svg)$/i)) {
      let imageFullname = path.resolve(f.path, f.filename);
      let thumbDir = path.resolve(f.path, "thumbs")
      let thumbFullname = path.resolve(f.path, "thumbs", f.filename)
      if (!fs.existsSync(thumbDir)) {
        mkdirp.sync(thumbDir)
      }
      console.log(imageFullname, thumbFullname);
      Jimp.read(imageFullname).then(function(img) {
        img.resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .write(thumbFullname); // save
        callback();
      }).catch(function(err) {
        console.error(err);
        callback(err);
      });
    }
  }, function done(err) {
    console.log(err)
  });
});
