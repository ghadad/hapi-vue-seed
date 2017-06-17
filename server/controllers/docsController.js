 'use strict';

 const fs = require("fs");
 const Joi = require('joi'); //Schema and validation
 const Boom = require('boom'); //HTTP errors
 const Async = require('async'); // HTTP requests
 const path = require('path');
 const Hoek = require("hoek");
 const md5 = require("md5");
 const mkdirp = require("mkdirp");

 const uuidV4 = require('uuid/v4');

 exports.upload = {
   description: 'Say hello!',
   notes: 'upload docs',
   tags: ['docs', 'upload'],
   payload: {
     output: 'stream',
     parse: true,
     allow: 'multipart/form-data',
     maxBytes: 10 * 1024 * 1024
   },

   handler: function(request, reply) {
     let db = this.db;
     var data = request.payload;

     //return reply(request.payload)
     if (data.file) {
       var name = data.file.hapi.filename;
       var batch_id = md5(request.payload.batch_id);
       var absdir = path.resolve(request.server.app.config.uploadDirectory, batch_id);
       var fullpath = absdir + path.sep + name;

       console.log("fullpath:", fullpath)
       var file;
       Async.series([
         function(cb) {
           mkdirp(absdir, function(err) {
             if (err) cb(err, null)
             else cb(null, true)

           });
         },
         function(cb) {
           file = fs.createWriteStream(fullpath);
           if (!file) {
             return cb("Failed to create fullpath :", null)
           }
           cb(null, true)
         },
         function(cb) {
           file.on('error', function(err) {
             return cb(err, null)
           });
           data.file.pipe(file);
           data.file.on('end', function(err) {
             var creation_date = Math.round(new Date().getTime() / 1000);
             if(data.file.hapi.headers['content-type'].match(/image/)) {
//fullpath
             }
             db.run("insert into docs (batch_id,path,filename,creation_date,created_by) values(?,?,?,?,?)",
             [batch_id, absdir, data.file.hapi.filename, creation_date,request.auth.credentials.profile.id], (err) => {
               var ret = {
                 absdir: absdir,
                 filename: data.file.hapi.filename,
                 headers: data.file.hapi.headers
               }
               cb(null, ret);
             });
           });
         }
       ], function(err, result) {
         if (err) {
           reply(err)
         } else {
           console.log(result);
           reply(result)
         }

       });
     }
   }
 };


 exports.getfile = {
   description: 'get single  file ',
   notes: 'searching docs',
   tags: ['docs', 'get'],
   handler: function(request, reply) {
     this.db.get("select * from docs where id = ?", [request.params.id], function(err, res) {
       let attach = 'attachment; filename=' + encodeURIComponent(res.filename);
       return reply.file(res.path + '/' + res.filename).header('content-disposition', attach);

     })
   }
 };

 exports.saveProps = {
   description: 'save  props ',
   notes: 'props & attributes',
   tags: ['docs', 'props'],
   handler: function(request, reply) {
     if(!request.auth.credentials.profile.admin) {
         return reply('Not Admin ...').code(401);
     }
      let prm = [] ;
      prm.push(JSON.stringify(request.payload.cat1));
      prm.push(JSON.stringify(request.payload.cat2));
      prm.push(JSON.stringify(request.payload.cat3));

       this.db.run("update props set cat1 = ? ,cat2 = ? ,cat3 = ?",prm,function(err, res) {
       if(err) return reply(Boom.badRequest(err));
       return reply({success:true})
     })
   }
 };

 exports.props = {
   description: 'get props ',
   notes: 'props & attributes',
   tags: ['docs', 'props'],
   handler: function(request, reply) {
       this.db.get("select * from props",function(err, res) {
       if(err) return reply(Boom.badRequest(err));
       if(res) {

          let ret = {} ;
          ret.cat1= JSON.parse(res.cat1 || '[]')

          ret.cat2= JSON.parse(res.cat2 || '[]')
          ret.cat3= JSON.parse(res.cat3 || '[]')
           console.log(ret)
          return reply(ret)
       } else
       return reply({cat1:[],cat2:[],cat3:[]})
     })
   }
 };
 exports.search = {
   description: 'searching docs!',
   notes: 'searching docs',
   tags: ['docs', 'search'],
   handler: function(request, reply) {
     //this.db.all("Select * from docs where path like '%פעילות%' or filename like '%פעילות%'",function(err,docs){
     //this.db.all("Select * from docs where id=?",["71c1dbe97d4fc8151f02b954d8026b0d"],function(err,docs){
     const db = this.db ;
     let prm = {};
     let sql = "Select * from docs where 1=1 ";
     let more_sql ="" ;
     console.log(request.query);
     if (request.query.term) {
       let term = request.query.term.replace(/[\+\s]/g, "%").replace(/\%+/g, "%");
       more_sql += " and (keys like $term or filename like $term or batch_id like $term )";
       prm.$term = '%' + term + '%'
     }

     if (request.query.myfiles) {
       more_sql += " and created_by = $id " ;
       prm.$id = request.auth.credentials.profile.id
     }
     more_sql += " limit 100 "
     Async.series([
       function(cb) {
            db.get("select count(*) as cnt from docs where 1=1 " +more_sql,prm,function(err,result) {
              if(err)   cb(err,null);
              else
              cb(null,result.cnt)
            })
       },function(cb) {
         db.all(sql + more_sql, prm, function(err, docs) {
       if(err) {
         cb(err,null)
       } else {
       let result = []
       docs.forEach(d => {
         result.push({
           creation_date: d.creation_date,
           id: d.id,
           md5: d.md5,
           filename: d.filename,
           keys: JSON.parse(d.keys)
         })

       })
       cb(null,result)
     }
     })
   }],function(err,result) {
      if(err) reply(Boom.badRequest(err))
      else
      reply({count:result[0],rows:result[1]});
   })
 }
 };
