'use strict';

var Controller = require('../controllers/userController');

module.exports = [{
        method: ['get', 'post'],
        path: '/api/user/login',
        config: Controller.login
    },
    {
        method: 'get',
        path: '/api/user/profile',
        config: Controller.profile
    },
    {
        method: 'GET',
        path: '/api/user',
        config: Controller.user
    },
    {
        method: 'get',
        path: '/api/user/logout',
        config: Controller.logout
    },

    {
        method: 'post',
        path: '/api/user/setProfile',
        config: Controller.setProfile
    }
];