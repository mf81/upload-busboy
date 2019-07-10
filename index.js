const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());

// default options
//app.use(fileUpload());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/"
  })
);

//safeFileNames: true

app.post("/upload", function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("./tekst.txt", function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

app.post("/obj", function(req, res) {
  //console.log(req.files.sampleFile.tempFilePath); // the uploaded file object
  console.log(req.files.sampleFile);
  res.send("File uploaded!");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Lisning on: ${port}`);
});

module.exports = server;
