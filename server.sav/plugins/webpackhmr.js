var internals = []

function init(appconf) {
    if (process.env.NODE_ENV !== 'production') {

        const WebpackConfig = require(appconf.basepath + 'config/webpack.config.js'); // Webpack config
        const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
        const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

        internals = [{
                name: "hmr",
                register: HapiWebpackDevMiddleware,
                options: {
                    config: WebpackConfig,
                    options: {
                        stats: 'errors-only',
                        noInfo: false,
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
