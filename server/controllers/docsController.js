'use strict';

const fs = require("fs");
const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const async = require('async'); // HTTP requests

const Hoek = require("hoek");


const uuidV4 = require('uuid/v4');

exports.upload = {
  description: 'Say hello!',
  notes: 'upload docs',
  tags: ['docs', 'upload'],
  payload: {
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
  },

  handler: function(request, reply) {
    var data = request.payload;

    //return reply(request.payload)
    if (data.file) {
      var name = data.file.hapi.filename;

      var path = __dirname + "/uploads/" + name;
      var file = fs.createWriteStream(path);
      if (!file) {
        return reply(Boom.badRequest("Failed to create path :" + path))
      }
      console.log(file)
      file.on('error', function(err) {
        return reply(Boom.badRequest(err))
      });
      data.file.pipe(file);
      data.file.on('end', function(err) {
        var ret = {
          path: path,
          filename: data.file.hapi.filename,
          headers: data.file.hapi.headers
        }
        return reply(ret);
      })
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

exports.search = {
  description: 'searching docs!',
  notes: 'searching docs',
  tags: ['docs', 'search'],
  handler: function(request, reply) {
    //this.db.all("Select * from docs where path like '%פעילות%' or filename like '%פעילות%'",function(err,docs){
    //this.db.all("Select * from docs where id=?",["71c1dbe97d4fc8151f02b954d8026b0d"],function(err,docs){
    let prm = {};
    let sql = "Select * from docs";
    console.log(request.query);
    if (request.query.term) {
      let term = request.query.term.replace(/[\+\s]/g, "%").replace(/\%+/g, "%");
      sql += " where path like $term or filename like $term or md5 like $term";
      prm.$term = '%' + term + '%'
      console.log("term", term)
    }
    sql += " limit 100 "
    console.log(sql);
    this.db.all(sql, prm, function(err, docs) {
      let result = []
      docs.forEach(d => {
        result.push({
          filename: d.filename,
          path: d.path.replace(/home.*data/g, "").replace(/ספרייה ראשית - מורות משקיעות/g, '').replace(/\/+/g, '#')
        })

      })
      reply(result)
    })
  }
};
