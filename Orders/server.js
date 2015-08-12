var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var server      = require('http').Server(app);
var path        = require("path");
var mongoose    = require("mongoose");
var moment      = require("moment");

app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/static")));


server.listen(8888, function()
{
    console.log("listening on port 8888");
});

