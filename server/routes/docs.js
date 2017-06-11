'use strict';

var Controller = require('../controllers/docsController');

module.exports = [{
    method: ['post'],
    path: '/api/docs/upload',
    config: Controller.upload
  },  {
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
    method: 'GET',
    path: '/api/docs/search',
    config: Controller.search
  }
];
