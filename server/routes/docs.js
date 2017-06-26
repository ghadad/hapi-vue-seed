'use strict';

const path = require("path");

var Controller = require('../controllers/docsController');

module.exports = [{
    method: ['post'],
    path: '/api/docs/upload',
    config: Controller.upload
  }, {
    method: 'get',
    path: '/api/docs/getfile/{id}',
    config: Controller.getfile
  },
  {
    method: 'get',
    path: '/api/docs/myfiles',
    config: Controller.search
  },
  {
    method: 'get',
    path: '/api/docs/getbatchid',
    handler: function(request, reply) {
      let db = this.db;
      db.get("select id ||':'||seq as batch_id from batch where id = ?", [request.auth.credentials.profile.id], function(err, result) {
        if (err) {
          return reply("Failed to retreive batch id").code(401);
        }
        if (result) {
          return reply({
            batch_id: result.batch_id
          })
        } else {
          db.run("insert into batch (id,seq) values (?,?)", [request.auth.credentials.profile.id, 0], (initerr, initres) => {
            if (initerr) {
              return reply("Failed to init batch_id in batch table").code(401)
            } else
              return reply({
                batch_id: request.auth.credentials.profile.id + ":" + 0
              })
          })

        }
      })
    }
  },
  {
    method: 'get',
    path: '/api/docs/getopenbatch',
    handler: function(request, reply) {

      this.db.get("select id ||':'||seq as batch_id from batch where id = ?", [request.auth.credentials.profile.id], function(err, result) {
        if (err) {
          return reply("Failed to retreive batch id").code(401);
        }

        if (result) {
          this.db.all("select * from docs where batch_id = ? ", [result.batch_id], (docserr, docs) => {
            if (docserr) {
              return reply("Failed to fetch grouped docs").code(401)
            }
            return reply({
              batch_id: result,
              docs_group: result,
              docs: (docs || [])
            })
          })
        } else {
          return reply({
            docs_group: {},
            docs: []
          })
        }
      })
    }
  },
  {
    method: 'get',
    path: '/api/docs/getbatch/{batch_id}',
    handler: function(request, reply) {
      let db = this.db;
      db.get("select *  from docs_group where batch_id = ?", [request.params.batch_id], function(err, result) {
        if (err) {
          return reply("Failed to docs_group").code(401);
        }

        if (!result) {
          return reply({
            batch_id: request.params.batch_id,
            docs_group: result,
            docs: []
          });
        }
        db.all("select * from docs where batch_id = ? ", [request.params.batch_id], (docserr, docs) => {
          if (docserr) {
            return reply("Failed to fetch grouped docs").code(401)
          }
          let retdocs = [];
          docs.forEach(d => {
            let defaultThumb = "imgs" + path.sep + "iconthumb" + path.extname(d.filename) + ".png" // returns '.html'
            d.thumb = (path.extname(d.filename).match(/(jpeg|jpg|png|bmp)$/i) ?
              path.resolve(request.server.app.config.uploadPublicDirectory, d.batch_id, "thumbs", d.filename) : defaultThumb);
            retdocs.push({
              filename: d.filename,
              thumb: d.thumb,
              id: d.id
            })
          })

          return reply({
            batch_id: request.params.batch_id,
            docs_group: result,
            docs: retdocs
          })
        })
      });
    }
  },
  {
    method: 'get',
    path: '/api/docs/complete',
    handler: function(request, reply) {
      let db = this.db;
      db.get("select seq from batch where id = ?", [request.auth.credentials.profile.id], function(err, result) {
        if (err) {
          return reply("Failed to retreive batch id in complete upload").code(401);
        }
        if (result) {
          db.run("insert into batch values(?,?)", [request.auth.credentials.profile.id, result.seq + 1], (err, res) => {

          })
        } else {
          db.run("insert into batch values(?,?)", [request.auth.credentials.profile.id, 1], (err, res) => {

          })
        }
      })
    }
  },
  {
    method: 'delete',
    path: '/api/docsgroup',
    handler: function(request, reply) {
      let db = this.db;
      db.run("delete from  docs_group where batch_id = ? and (created_by = ?  or 'true' = ?)", [request.query.batch_id, request.auth.credentials.profile.id, request.auth.credentials.profile.admin], function(err) {
        if (err) {
          return reply("Failed to retreive batch id in complete upload").code(410);
        }
        db.run("delete from  docs where batch_id = ? and (created_by = ?  or 'true' = ?)", [request.query.batch_id, request.auth.credentials.profile.id, request.auth.credentials.profile.admin], function(err) {
          if (err) {
            return reply("Failed to retreive batch id in complete upload").code(410);
          }
          return reply({
            success: true
          })
        })
      })
    }
  },
  {
    method: 'get',
    path: '/api/docs/delete',
    handler: function(request, reply) {
      let db = this.db;

      db.run("delete from  docs where id = ? and (created_by = ?  or 'true' = ?)", [request.query.id, request.auth.credentials.profile.id, request.auth.credentials.profile.admin], function(err) {
        if (err) {
          return reply("Failed to retreive batch id in complete upload").code(410);
        }
        return reply({
          success: true
        })
      })
    }
  }, {
    method: 'post',
    path: '/api/docs/batch',
    handler: function(request, reply) {
      let db = this.db;

      db.get("select *  from docs_group where batch_id = ?", [request.payload.batch_id], function(err, result) {
        if (err) {
          return reply("Failed to docs_group").code(401);
        }
        if (result) {
          console.log(request.payload)
          db.run("update docs_group set description =? , content =? ,created_by = ? where batch_id = ? ", [request.payload.description, request.payload.content, request.auth.credentials.profile.id, request.payload.batch_id], (err, res) => {
            if (err) return reply({
              success: false,
              err: err
            })
            else
              return reply({
                success: true
              })
          })
        } else {
          db.run("insert into docs_group (description,content,created_by,batch_id) values(?,?,?,?)", [request.payload.description, request.payload.content, request.auth.credentials.profile.id, request.payload.batch_id], (err, res) => {
            if (err) return reply({
              success: false
            })
            else
              return reply({
                success: true
              })
          })
        }
      })
    }
  }, {
    method: 'GET',
    path: '/api/docs/search',
    config: Controller.search
  }, {
    method: 'GET',
    path: '/api/docs/props',
    config: Controller.props
  },

  {
    method: 'post',
    path: '/api/docs/props',
    config: Controller.saveProps
  }
];
