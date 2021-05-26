const express = require('express');
const app = express();
const route = require('./routes');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./db');
db.connect();

app.set("view engine", "ejs");


app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true })); 

app.use(methodOverride('_method'))


route(app);
//app.get('/', function (req, res) {
 //  res.render('dictionary_search.ejs');
//});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => console.log("Server Up and running"));