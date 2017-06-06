'use strict';

const Joi = require('joi'); //Schema and validation
const Boom = require('boom'); //HTTP errors
const async = require('async'); // HTTP requests

const Hoek = require("hoek");


const uuidV4 = require('uuid/v4');
exports.login = {
  description: 'Say hello!',
  notes: 'The user parameter defaults to \'stranger\' if unspecified',
  tags: ['api', 'greeting'],
  auth: {
    mode: 'try'
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  },
  handler: function(request, reply) {

    let Msg = request.server.app.config.messages;
    console.log(request.server.plugins['db'])
    if (request.auth.isAuthenticated) {
      return reply({
        success: true,
        isAuthenticated: true,
        username: request.auth.credentials.username,
        message: "Already Auteticated",
        groups: request.auth.credentials.groups,
        admin: request.auth.credentials.admin,
        env: process.env.NODE_ENV
      });
    }

    if (request.method === 'post') {



    }
    if (request.method === 'get') {

      reply({
        success: true
      })
    }
  }
};

exports.user = {
  //auth:"session",
  handler: function(request, reply) {
    reply(request.server.auth)
  }
};

exports.profile = {
  auth: false,
  //plugins: { 'hapi-auth-cookie': { redirectTo: false } },
  handler: function(request, reply) {

    reply({
      var: "hello",
      auth: request.auth,
      db: this.db
    })
  }
};

exports.setProfile = {

  handler: function(request, reply) {

    reply({
      var: "hello"
    })
  }
};

exports.logout = {
  auth: false,
  handler: function(request, reply) {
    //request.server.app.cache.drop(request.cookieAuth)
    request.cookieAuth.clear();
    reply({
      var: "hello"
    }).unstate("peluser");
  }
};
