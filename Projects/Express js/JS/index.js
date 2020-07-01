var express = require("express");
var app = express();
app.get("/", function (req, res) {
  res.send("Hello");
});
app.get("/contactus", function (req, res) {
  res.sendFile(__dirname + "/contactus.html");
});
app.get("/get_contact", function (req, res) {
  var response = {
    name: req.query.name,
  };
  res.end(JSON.stringify(response));
});
app.listen(8080, "localhost");
