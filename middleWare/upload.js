const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (req.method === "POST") {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype != "text/csv")
        return res.status(500).send("File is not CSV");

      const saveTo = path.join("./tmp", path.basename(filename));
      const fileToSave = fs.createWriteStream(saveTo);
      file.pipe(fileToSave);
    });
    // busboy.on("finish", function() {
    //   res.send("File saved!!!");
    // });
    req.pipe(busboy);
  }
  next();
};
