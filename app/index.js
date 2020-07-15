const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(routes());

module.exports = app;
