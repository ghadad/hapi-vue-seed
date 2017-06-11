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


exports.search = {
  description: 'searching docs!',
  notes: 'searching docs',
  tags: ['docs', 'search'],
  handler: function(request, reply) {
    reply({
      success: true
    })
  }
};
