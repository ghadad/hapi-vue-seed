/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const dev = {
    user: process.env.NODE_ORACLEDB_USER || "bm_app",
    password: process.env.NODE_ORACLEDB_PASSWORD || "bm_app",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "logprod_webdev",
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    poolTimeout: 100
};

const prod = {
    user: process.env.NODE_ORACLEDB_USER || "bm_app",
    password: process.env.NODE_ORACLEDB_PASSWORD || "bm_app",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "logprod_webdev",
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
}


const siteEnv = process.env.SITE_ENV || "dev";


module.exports = {
    dev: dev,
    prod: prod,
    env: siteEnv
};