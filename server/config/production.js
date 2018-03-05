const path = require("path");
const mkdirp = require("mkdirp");
let uploadPath = path.resolve(__dirname, "../../public/upload/prod/");
mkdirp.sync(uploadPath);

module.exports = {
  db: {
    storage: process.cwd() + "/db/app.prod.db"
  },
  port: 3000,
  uploadDirectory: uploadPath,
  uploadPublicDirectory: "/upload/prod",
  host: "127.0.0.1",
  uri:"docs.morotmashkiot.co.il",
  admins: {
    "10154875974374531": true
  }

}
