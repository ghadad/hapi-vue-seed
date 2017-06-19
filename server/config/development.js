const path = require("path");
const mkdirp = require("mkdirp");
let uploadPath = path.resolve(__dirname, "../../upload/dev/");
mkdirp.sync(uploadPath)

module.exports = {
  db: {
    storage: process.cwd() + "/db/app.dev.db"
  },
  port: 3000,
  uploadDirectory: uploadPath,
  uploadPublicDirectory: "/upload/dev",
  host: "eduil.tk",
  admins: {
    "10154875974374531": true
  }
}
