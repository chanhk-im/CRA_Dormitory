// server main js

// [Load Packages]
var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

// [Configure mongoose]

// Connect to mongoose server
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
    console.log("Connected to mongod server");
});

mongoose.connect("mongodb://localhost/cra_dormitory", { useNewUrlParser: true });

// [Configure App to Use body-parser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [Configure Server port]
var port = process.env.PORT || 8080;

// [Configure Router]
var router = require("./routes")(app);

// [Run Server]
var server = app.listen(port, function() {
    console.log("Express server has started on port " + port);
});
