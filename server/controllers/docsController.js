'use strict';

const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const async = require('async'); // HTTP requests

const Hoek = require("hoek");


const uuidV4 = require('uuid/v4');

exports.upload = {
  description: 'Say hello!',
  notes: 'upload docs',
  tags: ['docs', 'upload'],
  handler: function(request, reply) {
    console.log(request.payload)

    reply({
      success: true
    })
  }
};


exports.getfile = {
  description: 'get single  file ',
  notes: 'searching docs',
  tags: ['docs', 'get'],
  handler: function(request, reply) {
    this.db.get("select * from docs where id = ?",[request.params.id],function(err,res) {
            let attach  =  'attachment; filename=' + encodeURIComponent(res.filename) +'.pdf;'
            return reply.file(res.path+'/'+res.filename).header('content-disposition', attach);

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
    let prm  = {} ;
    let sql = "Select * from docs" ;
     console.log(request.query);
    if(request.query.term) {
      let term = request.query.term.replace(/[\+\s]/g,"%").replace(/\%+/g,"%");
      sql += " where path like $term or filename like $term or md5 like $term";
      prm.$term = '%' + term + '%'
      console.log("term",term)
    }

       console.log(sql);
    this.db.all(sql,prm,function(err,docs){
      reply(docs)
    })
  }
};
