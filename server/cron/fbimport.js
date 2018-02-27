    var secret = require("../../secret") ;
var graph = require('fbgraph');
var axios = require("axios");
graph.setVersion("2.12");
var base = graph.getGraphUrl();
base=base+"/v2.12/";
var _ = require("lodash");
var members =[]; 
var jobs =[]; 

let sqlite3 = require("sqlite3");

let async = require("async");


if (!process.env.NODE_ENV) {
  console.log("Missing env variable NODE_ENV !")
  process.exit()
}
let config = require("../config");
const db = new sqlite3.Database(config.db.storage);

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", function(err, res) {
  if (!res) {
    db.serialize(function() {
      db.run("create table users (id number primary key , name text , email text ,isadmin boolean)");

    })
  }
});

var insert_stm =  db.prepare("INSERT INTO users (id,name,isadmin) VALUES (?,?,?)");
var update_stm =  db.prepare("UPDATE users set name = ? , isadmin=? where id =? ");
var newMembers = [] ;
var exists = {} ; 
let insertMembers = function() {
  var stmt = db.prepare("INSERT INTO users (id,name,isadmin) VALUES (?,?,?)");
  var stmt2 = db.prepare("select count(1) as cnt from users where id = ? ");

  return db.serialize(function() {

    internals.members.forEach(function(u) {
      console.log(internals.existsMembers[u.id])
      if (members[u.id] != true) {
        stmt.run(u.id, u.name);
        newMembers.push(u)
      }
    })
    console.log("Now finalize")
    console.log("internals.newMembers", internals.newMembers.length)
    stmt.finalize();
    stmt2.finalize();
    console.log("After finalize :internals.newMembers", internals.newMembers.length)
    let finaleResult = internals.newMembers.slice();
  })
}



 var uri  =  secret.facebook.gid + "/members";

let idx = 0; 
 function getGroup(nextUrl,token) { 
   
   return axios.get(nextUrl,{access_token:token}).then(function(res) { 
	var next = _.get(res.data,"paging.next")
	res.data.data.forEach(m => { 
		members.push(m) ;
	});
	console.log("members count :",members.length);
	if(next)
      return getGroup(next);
}  ).catch(function(err){
      console.log(err) ;
});
}
  
function getMembers(token) {
  console.log("get member token :",token);
  return  getGroup(base+uri+"?limit=5000&access_token="+token,token)
}


function getExistsMembers() { 
return new Promise(resolve => {
	db.all("SELECT *  FROM users ", function(err, res) {
		res.forEach( m=> {
			exists[m.id] = m ; 
			
                 });
		resolve(true);
    })
  });
}
module.exports.run = async function(token) {
/*var longToken = await axios.get(base+"/oauth/access_token",{params:{
    grant_type:'fb_exchange_token',          
    client_id:secret.facebook.clientId,
    client_secret:secret.facebook.clientSecret,
    fb_exchange_token:token}
	}) ;
*/

await getExistsMembers().then(()=>{

getMembers(token).then(res => {
	console.log(members[1]);
	console.log("members total  count :",members.length);
	return true; 
}).then(stat => { 
	console.log("finitiooooooo");
	members.forEach (m => { 
		if(exists[m.id] && exists[m.id].isadmin != m.administrator)  {
			jobs.push({oper:"update",value : m}) 
                } 
		if (!exists[m.id])  {
		    jobs.push({oper:"insert",value : m})
		}
              })
              return true ;
       }).then( stat => { 
		db.serialize(function() {
			jobs.forEach( j => { 
			   if(j.oper == "update") update_stm.run([j.value.name,j.value.administrator,j.value.id],function(err,res) {
				console.log("update : "+ j.value.id); 
				});
			   if(j.oper == "insert") insert_stm.run([j.value.id,j.value.name,j.value.administrator],(err,res)=>{
				console.log("insert :" + j.value.id ) ;
				})
				})
		})
        }) 
 });
 return true ;

}
