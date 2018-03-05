var internals = []

function init(appconf) {
    if (process.env.NODE_ENV !== 'production') {

        const WebpackConfig = require(appconf.basepath + 'config/webpack.config.js'); // Webpack config
        const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
        const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

		console.log(WebpackConfig.output);
        internals = [{
                name: "hmr",
                register: HapiWebpackDevMiddleware,
                options: {
                    config: WebpackConfig,
                    options: {
						//headers: { "Access-Control-Allow-Origin": "*" }﻿, //Magic line, try it
                        stats: 'errors-only',
                        noInfo: true,
                        publicPath: WebpackConfig.output.publicPath,
                        stats: {
                            colors: true 
                        }
                    }
                }
            }, {
                register: HapiWebpackHotMiddleware
            }];

    };
    return internals;
}

module.exports =  function(conf){
    return init(conf);
}
