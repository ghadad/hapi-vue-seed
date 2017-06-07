let FB = require("fb");

let secret = require("../../secret");
let fbOptions = {
  appId: secret.facebook.clientId,
  appSecret: secret.facebook.clientSecret,
  grant_type: 'client_credentials',
  version: 'v2.9'
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

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", function(err,res) {
  console.log("err",err)
  console.log("res",res)
  if (!res) {
    db.serialize(function() {
      db.run("create table users (id number primary key , name text , email text ,isadmin boolean)");


    })
  }

})


function getMembers2(FB, members, nextUrl, cb) {
  nextUrl = nextUrl.replace("https://graph.facebook.com/v2.9", "")
  console.log("nextUrl", nextUrl)
  if (nextUrl)
    FB.api(nextUrl, {}, function(res) {
      if (res.data)
        res.data.forEach((p) => {
          members.push(p);
        })
      if (res && res.paging && res.paging && res.paging.next) {
        getMembers(FB, members, res.paging.next, cb)
      } else {
        cb(members);
      }
    })
}

FB.setAccessToken('EAAGNGZBZAz4y0BANhZA8V5tYOfRZB3Pe8t3AJ0Vho1bZCOpz5NDd2a2ZCZBsETd7ZBw0h7FpcvJkQ9iKnGZAZB1OSSH1QQ4XZAdEICphYGBuLhUqIXgIEDZCgbZAMYZCahkx5XnSZCRdfWUraCdZA7SwghMhLjZCAOknnYTRaUd0ZD');

function getMembers(members, nextUrl, cb) {
  nextUrl = nextUrl.replace("https://graph.facebook.com/v2.9", "")
  FB.api(nextUrl, {}, function(res) {
    if (res.data)
      res.data.forEach((p) => {
        members.push(p);
      })
    if (res && res.paging && res.paging && res.paging.next && members.length < 5000) {
      getMembers(members, res.paging.next, cb)
    } else {
      cb(members);
    }
  })
}


let insertMembers = function(memebers) {
  var stmt = db.prepare("INSERT INTO users (id,name) VALUES (?,?)");
  db.serialize(function() {
    db.run("DELETE FROM users");
    memebers.forEach(function(u) {

      stmt.run(u.id, u.name);


    });
    stmt.finalize();
    console.log("update members count : ", members.length)
  })
}

let members = [];
getMembers(members, "/397081443825167/members?limit=10000", insertMembers);
