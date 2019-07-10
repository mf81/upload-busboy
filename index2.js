const express = require("express");
const app = express();

const validate = require("express-validation");
const validation = require("./validation/upload");
const upload = require("./middleWare/upload");

app.use(express.json());

app.post("/upload", [validate(validation), upload], (req, res) => {
  console.log(req.headers);
  res.send("File saved!!!");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Lisning on: ${port}`);
});

module.exports = server;
