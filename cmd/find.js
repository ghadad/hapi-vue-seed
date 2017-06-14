#!/usr/bin/node

const fs = require("fs");
const mkdirp = require("mkdirp");
const md5 = require("md5");
const cp = require("cp");

let sqlite3 = require("sqlite3");
let db = new sqlite3.Database("../db/app.dev.db");
var stmt = db.prepare("INSERT INTO docs (batch_id,path,filename,keys,creation_date,created_by)  VALUES (?,?,?,?,?,1)");
let Async = require("async");

db.on("trace", function(log) {
  console.log(log)
});


const path = require('path');


let filedata = fs.readFileSync("./allfiles.txt", {
  encoding: "utf8"
});

let internal = {
  idx: 0
};


const uploadDir = "/home/golanh/hapi-teachers/upload/dev";

Async.waterfall([function(callback) {
      db.serialize(function() {
        db.run("drop table docs;");
        db.run("delete from sqlite_sequence where name='docs'");
        db.run("create table docs (id integer primary key autoincrement , path text , filename text,keys text,batch_id text,created_by text,creation_date INTEGER,update_date INTEGER)", (err) => {
          callback(null, true)
        });

      });

    },
    function(res, callback) {
      db.serialize(function() {

        let data = filedata.split(/[\n\r]+/);
        console.log("Count : ", data.length);
        data.forEach(f => {
          if (f.length > 10) {
            //console.log("MD%:",md5(f));
            console.log("base:", path.basename(f))
            //console.log("dir:" , path.dirname(f))
            internal.idx++;
            var $path = path.dirname(f).replace(/home.*data/g, "").replace(/ספרייה ראשית - מורות משקיעות/g, '').replace(/\/+/g, '#').replace(/#+/g, "#")
            let keysarr = [];
            $path.replace("^#", '').replace("#$", '').split("#").forEach(k => {
              if (k.length) keysarr.push(k.replace("#", ""));
            })


            var $keys = JSON.stringify(keysarr);
            let $md5 = md5(path.dirname(f));
            let upd = path.resolve(uploadDir, $md5);
            let $basename = path.basename(f);

            mkdirp.sync(upd);

            stmt.run([$md5, upd, $basename, $keys, Math.round(new Date().getTime() / 1000)], err => {
              if (err) console.log(err);
              cp(f, path.resolve(upd, $basename), () => {});
            });

          }
        });
        stmt.finalize();
        callback(null, true)
      });

    }
  ],
  function(err, res) {
    db.get("select count(1) from docs", function(err, res) {
      console.log("selected : ", res)
      process.exit(0)
    })
  });
