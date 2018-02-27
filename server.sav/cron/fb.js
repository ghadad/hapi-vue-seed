let FB = require("fb");
const Promise = require("bluebird");

let secret = require("../../secret");
let fbOptions = {
  appId: secret.facebook.clientId,
  appSecret: secret.facebook.clientSecret,
  grant_type: 'client_credentials',
  version: 'v2.9'
};

let internals = {
  members: [],
  gid: secret.facebook.gid,
  newMembers: [],
  existsMembers: {}
};

FB.options(fbOptions);

let sqlite3 = require("sqlite3");

let async = require("async");


if (!process.env.NODE_ENV) {
  console.log("Missing env variable NODE_ENV !")
  process.exit()
}
let config = require("../config");
//console.log(config);
const db = new sqlite3.Database(config.db.storage);

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", function(err, res) {
  if (!res) {
    db.serialize(function() {
      db.run("create table users (id number primary key , name text , email text ,isadmin boolean)");

    })
  }

})



function getMembers(nextUrl, callback) {
  var re = /.*facebook.com\/[\w\.]+/gi;
  nextUrl = nextUrl.replace(re, "")
  console.log("New NextUrl", nextUrl)
  
  FB.api(nextUrl, {}, function(res) {
    if (res.data)
      res.data.forEach((p) => {
        internals.members.push(p);
      })
    console.log("internals.members length :", internals.members.length)
    if (res && res.paging && res.paging && res.paging.next) { //} && internals.members.length < 90) {
      getMembers(res.paging.next, callback)
    } else {
      console.log("internals.members.length", internals.members.length)
      callback(null, true)
    }
  })
}


let insertMembers = function(callback) {
  var stmt = db.prepare("INSERT INTO users (id,name) VALUES (?,?)");
  var stmt2 = db.prepare("select count(1) as cnt from users where id = ? ");

  return db.serialize(function() {

    internals.members.forEach(function(u) {
      console.log(internals.existsMembers[u.id])
      if (internals.existsMembers[u.id] != true) {
        stmt.run(u.id, u.name);
        internals.newMembers.push(u)
      }
    })
    console.log("Now finalize")
    console.log("internals.newMembers", internals.newMembers.length)
    stmt.finalize();
    stmt2.finalize();
    console.log("After finalize :internals.newMembers", internals.newMembers.length)
    let finaleResult = internals.newMembers.slice();
    internals.newMembers = [];
    callback(null, finaleResult);
  })
}

let setExists = function(callback) {
  db.all("select * from users", (err, res) => {

    res.forEach(u => {
      internals.existsMembers[u.id] = true;
    })
    callback(null, true);
  })
}

module.exports = {
  import: function(token, callback) {
    console.log("start import")
    FB.setAccessToken(token);
    getMembers(internals.gid + "/members?limit=10000", callback);
  },
  filter: function(callback) {
    console.log("start filter")
    setExists(callback)
  },
  insert: function(callback) {
    console.log("start insert")
    insertMembers(callback)
  }
};
