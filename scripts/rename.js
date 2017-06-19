#!/usr/bin/node

const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");
const mkdirp = require("mkdirp");
const md5 = require("md5");
const async = require("async");
let sqlite3 = require("sqlite3");
let db = new sqlite3.Database("../db/app.dev.db");
let stmt = db.prepare("update docs set md5 = $md5 , path = $path  , keys = $keys where id = $id");

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});


db.on("trace", function(log) {
  console.log(log)
});

let data = {};
async.series([function(cb) {
    db.all("select * from docs", function(err, files) {
      data.files = files;
      cb(err, true);
    })
  }, function(cb) {
    data.files.map(f => {
      f.path = f.path.replace(/home.*data/g, "").replace(/ספרייה ראשית - מורות משקיעות/g, '').replace(/\/+/g, '#')
      f.keys = "[" + f.path.replace("^#", '').split("#").join(",") + "]";
      f.md5 = md5(f.keys);
    })
    console.log(data.files)
    cb(null, true);
  }, function(cb) {
    db.serialize(function() {

      data.files.forEach(f => {
        stmt.run({
          $md5: f.md5,
          $path: f.path,
          $keys: f.keys,
          $id: f.id
        }, err => {
          console.log("err inserted", err)
        })
      });
      cb(null, true)
    })

  }],
  function(err, result) {
    stmt.finalize();
    db.all("select * from docs", function(err, result) {
      console.log("ERROR:", err)
      console.log(result)
      process.exit();
    })
  })
