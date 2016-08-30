var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var mongoose= require("./db/connection");

var app     = express();

var Dog = mongoose.model("Dog");

// if(process.env.NODE_ENV !== "production"){
//   var env   = require("./env");
//   process.env.session_secret = env.session_secret;
//   process.env.t_callback_url = env.t_callback_url;
//   process.env.t_consumer_key = env.t_consumer_key;
//   process.env.t_consumer_secret = env.t_consumer_secret;
// }
//
// app.use(session({
//   secret: process.env.session_secret,
//   resave: false,
//   saveUninitialized: false,
//   store: new (require("connect-mongo")(session))({
//     mongooseConnection: mongoose.connection
//   })
// }));

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use("/bower", express.static("bower_components"));
app.use(parser.json({extended: true}));
// app.use(function(req, res, next){
//   res.locals.isProduction = (process.env.NODE_ENV == "production");
//   twitter.checkIfSignedIn(req, res, function(){
//     next();
//   });
// });

// app.get("/login/twitter", function(req, res){
//   twitter.getSigninURL(req, res, function(url){
//     res.redirect(url);
//   });
// });
//
// app.get("/login/twitter/callback", function(req, res){
//   twitter.whenSignedIn(req, res, function(){
//     res.redirect("/");
//   });
// });
//
// app.get("/logout", function(req, res){
//   req.session.destroy();
//   res.redirect("/");
// });

app.get("/api/dogs", function(req, res){
  Dog.find({}).then(function(dogs){
    res.json(dogs);
  });
});

app.get("/api/dogs/:name", function(req, res){
  Dog.findOne({name: req.params.name}).then(function(dog){
    res.json(dog);
  });
});

app.delete("/api/dogs/:name", function(req, res){
  Dog.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/dogs/:name", function(req, res){
  Dog.findOneAndUpdate({name: req.params.name}, req.body.dog, {new: true}).then(function(dog){
    res.json(dog);
  });
});


app.get("/*", function(req, res){
  res.render("dogs");
});

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
