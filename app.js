var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('angelov21:plf13017@ds237445.mlab.com:37445/final-project');
var express = require("express");
var app = express();

app.use(function(req, res, next) {
    req.db = db;
    next();
});

var index = require('./routes/index');
var login = require("./routes/login");
var phones = require("./routes/phones");
var registration = require('./routes/registration');
var tvs = require("./routes/tvs");
var computers = require("./routes/computers");

// app.use(express.static('public'));
// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'Yoana' }));

function requireLogin(req, res, next) {
    if (req.session.userId != undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}

// app.use('/', index);
app.use('/login', login);
app.use("/phones", phones);
app.use('/registration', registration);
app.use("/tvs", tvs);
app.use("/computers", computers);

// app.use('/logout', requireLogin, logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;