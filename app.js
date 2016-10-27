express = require("express")
fs = require("fs")
app = express()
expressLayouts = require('express-ejs-layouts')
ejs = require("ejs")
nodemailer = require("nodemailer")
mongoose = require("mongoose")
// mongoose.connect(process.env.MONGOLAB_URI)
path = require("path")
u = require("underscore")
bodyParser = require("body-parser")
passport = require('passport')
cookieParser = require('cookie-parser')
session = require('express-session');
requireDir = require('require-dir')
LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({secret: "cookie_secret", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('layout', 'layout')

var directories = ['functions', 'routes', 'models']
directories.forEach(function(directory){
    requireDir(directory)
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(port, ip_address)

