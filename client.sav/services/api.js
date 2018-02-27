/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Axios from "axios"


/* Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

*/

import LocalStorage from "store";

Axios.interceptors.response.use(function (response) {
    // Do something with response data

    if (response.data && response.data.success == false && response.data.isAuthenticated == false) {



        LocalStorage.set("isauth", false)

        return Promise.reject({
            status: 401,
            message: "UnAutorized "
        });
    }
    return response;
}, function (error) {
    console.log("error", error)
    if (error.response && error.response.status && error.response.status == 401) {
        LocalStorage.set("isauth", false)



    }
    // Do something with response error
    let customError = {};

    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});

export default {
    login(credetials) {
        if (typeof credetials === "undefined")
            return Axios.get('/api/user/login')
        else
            return Axios.post('/api/user/login', credetials)
    },
    logout(credetials) {
        return Axios.get('/api/user/logout')
    },

    getApps(row_id) {

        if (row_id !== undefined) {
            return Axios.get('/api/apps', {
                params: {
                    row_id: row_id
                }
            });
        }

        return Axios.get('/api/apps')

    },

    approveUpdate(query_prm) {
        return Axios.get('/api/apps/approveupdate', {
            params: query_prm
        })
    },
    adminSaveApp(app) {
        return Axios.post('/api/apps/save', app)
    },
    saveItem(data) {
        return Axios.post('/api/apps/saveitem', data)
    },
    adminApps(row_id, admin) {

        if (row_id !== undefined) {
            return Axios.get('/api/adminapps', {
                params: {
                    row_id: row_id,
                    admin: admin
                }
            });
        }
        return Axios.get('/api/adminapps')

    },

    getStores() {
        return Axios.get('/api/stores');
    },

    saveDraftSettings(data) {
        return Axios.post('/api/apps/savedraft', data)
    },
    sendTemplate(data) {
        return Axios.post('/api/apps/sendtemplate', data)
    },
    getValue(row_id) {
        return Axios.get('/api/apps/getvalue', {
            params: {
                row_id: row_id
            }
        })
    }
}