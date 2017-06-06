/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function initDb(server) {
    server.app.properties = {}
    server.getDb((err, conn) => {
        conn.execute(
            "select *  from properties  " +
            "where sysdate between EFFECTIVEDATE  " +
            "and nvl(SYS_CANCEL_DATE,sysdate+1) and upper(categoryid) ='C100'", {}, {
                outFormat: require("oracledb").OBJECT,
                // fetch all rows in cursor
                maxRows: 10000
            },
            (err, result) => {
                if (err)
                    throw err;

                server.app.properties = server.app.utils.toObject(result.rows, "PROPNAME", "PROPVAL");

            })
    })
}


function setCookiesAuth(server) {
    //set it default auth (third params - true) 
    const cache = server.cache({
        segment: 'sessions',
        expiresIn: 3 * 60 * 60 * 1000,
        generateTimeout: 2 * 60 * 60 * 1000,
        generateFunc: (key, next) => {
            console.log(key)
            return next(null, key)
        }
    });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
        password: 'password-should-be-32-characters',
        cookie: 'sidauth',
        //redirectTo: '/#/login',
        isSecure: false,
        keepAlive: true,
        ttl: 3 * 60 * 60 * 1000,
        validateFunc: function (request, session, callback) {

            cache.get(session.sid, (err, cached) => {

                if (err) {

                    return callback(err, false);
                }

                if (!cached) {

                    return callback(null, false);
                }
                cache.set(session.sid, cached, 100000);
                return callback(null, true, cached.account);
            });
        }
    });

}

function setCookies(server) {
    server.state('peluser', {
        ttl: null,
        isSecure: true,
        isHttpOnly: false,
        encoding: 'none',
        clearInvalid: false, // remove invalid cookies
        strictHeader: false // don't allow violations of RFC 6265
    });

    server.state('cookie2', {
        ttl: null,
        isSecure: false,
        isHttpOnly: false,
        encoding: 'none',
        clearInvalid: false, // remove invalid cookies
        strictHeader: true // don't allow violations of RFC 6265
    });
}

module.exports = {
    initDb,
    setCookiesAuth: setCookiesAuth,
    setCookies
}