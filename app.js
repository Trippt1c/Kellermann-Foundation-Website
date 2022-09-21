const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
var session = require("express-session");
const mysql = require("mysql");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
var loggedin;

// sessions
app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + (60000 * 60 * 24 * 30))
  })
);

app.locals.logged = function(){
  return loggedin;
};

app.use(express.urlencoded({ extended: true })); // New
app.use(express.json()); // New

// Static Files
app.use(express.static("public"));

// Templating Engine
app.engine("hbs", exphbs({extname: ".hbs"}));
app.set("view engine", "hbs");

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session && req.session.user == "admin" && req.session.admin){
      loggedin = true;
      return next();
    }else{
      return res.redirect('/login')
    }
};

//authentication however you spell it
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
    console.log(req.body);

  if (
    req.body.username == "admin" &&
    req.body.password == "password"
  ) {
    req.session.user = "admin";
    req.session.admin = true;
    res.redirect("/");
    loggedin = true;
  }else{
    res.redirect("/login");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/login");
    loggedin = false;
});

const orgs = require("./server/routes/orgs");
app.use("/orgs", auth, orgs);

const donors = require("./server/routes/donors");
app.use("/donors", auth, donors);

const report = require("./server/routes/report");
app.use("/report", auth, report);

const home = require("./server/routes/home");
app.use("/", auth, home);

app.listen(port, () => console.log(`Listening on port ${port}`));
