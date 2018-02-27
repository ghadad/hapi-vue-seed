const path = require("path");
const mkdirp = require("mkdirp");
let uploadPath = path.resolve(__dirname, "../../public/upload/dev/");
mkdirp.sync(uploadPath);

module.exports = {
  db: {
    storage: process.cwd() + "/db/app.development.db"
  },
  port: 80,
  uploadDirectory: uploadPath,
  uploadPublicDirectory: "/upload/dev",
  host: "46.101.126.238",
  uri:"docs.morotmashkiot.co.il",
  admins: {
    "10154875974374531": true
  }

}
