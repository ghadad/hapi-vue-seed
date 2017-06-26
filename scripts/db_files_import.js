#!/usr/bin/node

let sqlite3 = require("sqlite3");
let Async = require("async");
const fs = require("fs");
const mkdirp = require("mkdirp");
const md5 = require("md5");
const cp = require("cp");


if (!process.env.BATCH_ENV) {
  console.error("Please export BATCH_ENV variable !");
  process.exit();
}
let env = process.env.BATCH_ENV;

let config = {
  removePath: new RegExp("home.*data*ספרייה ראשית - מורות משקיעות", 'ig'),
  sourceFile: '/home/golanh/hapi-teachers/data' + '/allfiles.txt',
  uploadDir: "/home/golanh/hapi-teachers/upload/" + env,
  db: new sqlite3.Database('/home/golanh/hapi-teachers/db/app.' + env + '.db')
};

console.log("config:", config)

let db = config.db;
let stmt = "";


db.on("trace", function(log) {
  console.log(log)
});


const path = require('path');


let filedata = fs.readFileSync(config.sourceFile, {
  encoding: "utf8"
});

let internal = {
  idx: 0
};



Async.waterfall([function(callback) {

    db.serialize(function() {
      stmt = db.prepare("INSERT INTO docs (batch_id,path,filename,keys,creation_date,created_by)  VALUES (?,?,?,?,?,1)");
      let data = filedata.split(/[\n\r]+/);
      console.log("Count : ", data.length);
      data.forEach(f => {
        if (f.length > 10) {
          //console.log("base:", path.basename(f))
          internal.idx++;
          var $path = path.dirname(f).replace(config.removePath).replace(/\/+/g, '#').replace(/#+/g, "#")
          let keysarr = [];
          $path.replace("^#", '').replace("#$", '').split("#").forEach(k => {
            if (k.length) keysarr.push(k.replace("#", ""));
          })

          var $keys = JSON.stringify(keysarr);
          let $md5 = md5(path.dirname(f));
          let upd = path.resolve(config.uploadDir, $md5);
          let $basename = path.basename(f);
          mkdirp.sync(upd);

          stmt.run([$md5, upd, $basename, $keys, new Date().getTime()], err => {
            if (err) console.log(err);

            cp(f, path.resolve(upd, $basename), () => {});
          });

        }
      });
      stmt.finalize();
      callback(null, true)
    });

  }],
  function(err, res) {
    db.get("select count(1) from docs", function(err, res) {
      console.log("selected : ", res)
      process.exit(0)
    })
  });
