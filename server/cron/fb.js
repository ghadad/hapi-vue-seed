let FB = require("fb");
const  Promise = require("bluebird");

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


let internals = {
  members:[]
} ;
if (!process.env.NODE_ENV) {
  console.log("Missing env variable NODE_ENV !")
  process.exit()
}
let config = require("../config");
//console.log(config);
const db = new sqlite3.Database(config.db.storage);

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", function(err, res) {
  console.log("err", err)
  console.log("res", res)
  if (!res) {
    db.serialize(function() {
      db.run("create table users (id number primary key , name text , email text ,isadmin boolean)");

    })
  }

})



function getMembers(nextUrl,callback) {
  console.log(nextUrl)
  nextUrl = nextUrl.replace("https://graph.facebook.com/v2.9", "")
  FB.api(nextUrl, {}, function(res) {
    if (res.data)
      res.data.forEach((p) => {
        internals.members.push(p);
      })
    console.log("internals.members length :",internals.members.length )
    if (res && res.paging && res.paging && res.paging.next ) {
      getMembers(res.paging.next,callback)
    } else {
      callback(internals.members);
    }
  })
}


let insertMembers = function(memebers,cb) {
  var stmt = db.prepare("INSERT INTO users (id,name) VALUES (?,?)");
  var stmt2 = db.prepare("select count(1) as cnt from users where id = ? ");
  db.serialize(function() {

    return new Promise((reject,resolve) =>{
      internal.memebers.forEach(function(u) {
      stmt2.get([u.id] ,function(err,res) {
        reject(err)
        if(res && res.cnt!=1)
          stmt.run(u.id, u.name,function(err2,res2){
            reject(err2)
          });
      })
      });
      resolve(true)
    }).then(stat => {
      stmt.finalize();
      stmt2.finalize();
      resolve(internals.memebers);
      console.log("update members count : ", members.length)
    });
  })
}

module.exports = {
  setAccessToken: function(a) {
    FB.setAccessToken(a);
  },
  import : function(callback) {

         getMembers("/397081443825167/members?limit=10000",callback);

    }
};
