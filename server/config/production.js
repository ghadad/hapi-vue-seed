const path = require("path");
const mkdirp = require("mkdirp");
let uploadPath = path.resolve(__dirname, "../../upload/prod/");
mkdirp.sync(uploadPath);

module.exports = {
  db: {
    storage: process.cwd() + "/db/app.prod.db"
  },
  port: 3001,
  uploadDirectory: uploadPath,
  uploadPublicDirectory: "/upload/prod",

  host: "eduil.tk",
  admins: {
    "10154875974374531": true
  }

}
