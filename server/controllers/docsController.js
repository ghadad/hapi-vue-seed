 'use strict';

 const fs = require("fs");
 const Joi = require('joi'); //Schema and validation
 const Boom = require('boom'); //HTTP errors
 const Async = require('async'); // HTTP requests
 const path = require('path');
 const Hoek = require("hoek");
 const md5 = require("md5");
 const mkdirp = require("mkdirp");
 const Jimp = require("jimp");
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
       var batch_id = request.payload.batch_id;
       var absdir = path.resolve(request.server.app.config.uploadDirectory, batch_id);
       var thumbnsDir = path.resolve(absdir, "thumbs");


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
             if (data.file.hapi.headers['content-type'].match(/image/)) {
               Jimp.read(fullpath).then(function(img) {
                 img.resize(256, 256) // resize
                   .quality(60) // set JPEG quality
                   .write(thumbnsDir + path.sep + data.file.hapi.filename); // save
               }).catch(function(err) {
                 console.error(err);
               });

             }
             let defaultThumb = "/imgs" + path.sep + "iconthumb" + path.extname(data.file.hapi.filename) + ".png" // returns '.html'


             db.run("insert into docs (batch_id,path,filename,creation_date,created_by) values(?,?,?,?,?)", [batch_id, absdir, data.file.hapi.filename, creation_date, request.auth.credentials.profile.id], (err) => {
               if (err) {
                 return cb(err, null)
               }
               db.get("select seq from sqlite_sequence where name='docs'", (errseq, resseq) => {
                 var ret = {
                   batch_id: batch_id,
                   id: resseq.seq,
                   thumb: (path.extname(data.file.hapi.filename).match(/(jpeg|jpg|png|bmp)$/i) ?
                     path.resolve(request.server.app.config.uploadPublicDirectory, batch_id, "thumbs", data.file.hapi.filename) : defaultThumb),
                   filename: data.file.hapi.filename,

                 }
                 cb(null, ret);
               })
             });

           });
         }
       ], function(err, result) {
         if (err) {
           reply(err)
         } else {
           reply(result[2])
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
          if (err) return reply(Boom.badRequest(err));
          if(!res) return reply(Boom.badRequest("File not found on server"));
       let file = res.path + '/' + res.filename;

       if (request.query.thumb) {
         file = path.resolve(res.path, "thumbs", res.filename)
       }
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
     if (!request.auth.credentials.profile.admin) {
       return reply('Not Admin ...').code(401);
     }
     let prm = [];
     prm.push(JSON.stringify(request.payload.cat1));
     prm.push(JSON.stringify(request.payload.cat2));
     prm.push(JSON.stringify(request.payload.cat3));
     console.log("PRM : ", prm)
     this.db.run("update props set cat1 = ? ,cat2 = ? ,cat3 = ?", prm, function(err) {
       if (err) return reply(Boom.badRequest(err));
       return reply({
         success: true
       })
     })
   }
 };

 exports.props = {
   description: 'get props ',
   notes: 'props & attributes',
   tags: ['docs', 'props'],
   handler: function(request, reply) {
     this.db.get("select * from props", function(err, res) {
       if (err) return reply(Boom.badRequest(err));
       if (res) {

         let ret = {};
         ret.cat1 = JSON.parse(res.cat1 || '[]')
         ret.cat2 = JSON.parse(res.cat2 || '[]')
         ret.cat3 = JSON.parse(res.cat3 || '[]')
         console.log(ret)
         return reply(ret)
       } else
         return reply({
           cat1: [],
           cat2: [],
           cat3: []
         })
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
     const db = this.db;
     let prm = {};
     let sql = "Select docs.*,users.name  from docs " +
       " left  join users on docs.created_by = users.id  " +
       " where 1=1 ";
     let more_sql = "";
     console.log(request.query);
     if (request.query.term) {
       let term = request.query.term.replace(/[\+\s]/g, "%").replace(/\%+/g, "%");
       if (request.query.tag == "true" || request.query.tag == true)
         more_sql += " and (keys like $term)";
       else
         more_sql += " and (keys like $term or filename like $term or docs.batch_id like $term )";
       prm.$term = '%' + term + '%'
     }

     if (request.query.myfiles) {
       more_sql += " and created_by = $id ";
       prm.$id = request.auth.credentials.profile.id
     }

     // PAGES
     let pageSize = request.query.pageSize || 100;

     let currentPage = request.query.page || 1;
     if (currentPage < 0) currentPage = 1;

     more_sql += " limit " + pageSize
     let offset = (currentPage - 1) * pageSize;
     let offset_sql = " offset " + offset

     console.log("more_sql", more_sql)
     Async.series([
         function(cb) {

           db.get("select count(*) as cnt from docs where 1=1 " + more_sql + offset_sql, prm, function(err, result) {
             if (err) cb(err, null);
             else {
               if (result)
                 cb(null, result.cnt)
               else
                 cb(null, 0)
             }
           })
         },
         function(cb) {
           db.all(sql + more_sql + offset_sql, prm, function(err, docs) {
             if (err) {
               cb(err, null)
             } else {
               let result = []
               docs.forEach(d => {

                 let defaultThumb = "/imgs" + path.sep + "iconthumb" + path.extname(d.filename) + ".png" // returns '.html'


                 result.push({
                   creation_date: d.creation_date,
                   id: d.id,
                   md5: d.md5,
                   filename: d.filename,
                   batch_id: d.batch_id,
                   created_by: d.created_by,
                   facebook_name: d.name,
                   facebook_pic_url: "http://graph.facebook.com/v2.9/" + d.created_by + "/picture",
                   keys: JSON.parse(d.keys),
                   pathurl: path.resolve(request.server.app.config.uploadPublicDirectory, d.batch_id, d.filename),
                   enlarge: (d.filename.match(/(jpeg|jpg|png|bmp)$/i) ? true : false),
                   thumb: (d.filename.match(/(jpeg|jpg|png|bmp)$/i) ?
                     path.resolve(request.server.app.config.uploadPublicDirectory, d.batch_id, "thumbs", d.filename) : defaultThumb),



                 })

               })
               cb(null, result)
             }
           })
         }
       ],
       function(err, result) {
         if (err) reply(Boom.badRequest(err))
         else
           reply({
             currentPage: currentPage,
             pageSize: pageSize,
             totalPages: Math.ceil(result[0] / pageSize),
             count: result[0],
             rows: result[1]
           });
       })
   }
 };


  exports.search2 = {
    description: 'searching folders!',
    notes: 'searching folders',
    tags: ['folders', 'search'],
    handler: function(request, reply) {
      //this.db.all("Select * from docs where path like '%פעילות%' or filename like '%פעילות%'",function(err,docs){
      //this.db.all("Select * from docs where id=?",["71c1dbe97d4fc8151f02b954d8026b0d"],function(err,docs){
      const db = this.db;
      let prm = {};
      let sql = "Select docs_group.*,users.name  from docs_group " +
        " left  join users on docs_group.created_by = users.id  " +
        " where 1=1 ";
      let more_sql = "";

      if (request.query.term) {
        let term = request.query.term.replace(/[\+\s]/g, "%").replace(/\%+/g, "%");
        if (request.query.tag == "true" || request.query.tag == true)
          more_sql += " and (props like $term) ";
        else
          more_sql += " and (props like $term or description like $term or content like $term )";
         prm.$term = '%' + term + '%'
      }

      if (request.query.myfiles) {
        more_sql += " and created_by = $id ";
        prm.$id = request.auth.credentials.profile.id
      }

      // PAGES
      let pageSize = request.query.pageSize || 100;

      let currentPage = request.query.page || 1;
      if (currentPage < 0) currentPage = 1;

      more_sql += " limit " + pageSize
      let offset = (currentPage - 1) * pageSize;
      let offset_sql = " offset " + offset

      console.log("more_sql", more_sql)
      Async.series([
          function(cb) {

            db.get("select count(*) as cnt from docs_group where 1=1 " + more_sql + offset_sql, prm, function(err, result) {
              if (err) cb(err, null);
              else {
                if (result)
                  cb(null, result.cnt)
                else
                  cb(null, 0)
              }
            })
          },
          function(cb) {
            console.log(sql + more_sql + offset_sql)
            db.all(sql + more_sql + offset_sql, prm, function(err, docs) {
              if (err) {
                cb(err, null)
              } else {
                let result = []
                docs.forEach(d => {

                  //let defaultThumb = "/imgs" + path.sep + "iconthumb" + path.extname(d.filename) + ".png" // returns '.html'


                  result.push({
                  //  creation_date: d.creation_date,
                  //  id: d.id,
                  //  md5: d.md5,
                    description: d.description,
                    batch_id: d.batch_id,
                    created_by: d.created_by,
                    facebook_name: d.name,
                    facebook_pic_url: "http://graph.facebook.com/v2.9/" + d.created_by + "/picture",
                    props: JSON.parse(d.props),
                    //pathurl: path.resolve(request.server.app.config.uploadPublicDirectory, d.batch_id, d.filename),
                    //enlarge: (d.filename.match(/(jpeg|jpg|png|bmp)$/i) ? true : false),
                    //thumb: (d.filename.match(/(jpeg|jpg|png|bmp)$/i) ?
                    //  path.resolve(request.server.app.config.uploadPublicDirectory, d.batch_id, "thumbs", d.filename) : defaultThumb),



                  })

                })
                cb(null, result)
              }
            })
          }
        ],
        function(err, result) {
          if (err) reply(Boom.badRequest(err))
          else
            reply({
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: Math.ceil(result[0] / pageSize),
              count: result[0],
              rows: result[1]
            });
        })
    }
  };
