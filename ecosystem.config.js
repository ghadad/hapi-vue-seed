module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
    name      : "PROD",
    script    : "app.js",
    instances  : 0,
    exec_mode  : "cluster" ,
      env: {
        NODE_ENV: "production" ,
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ]

}
