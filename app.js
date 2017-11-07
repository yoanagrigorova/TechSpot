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
var sha1 = require("sha1");
var app = express();
var MongoStore = require('connect-mongo')(session);

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
var microwaveOvens = require("./routes/microwaves");
var vacuumCleaners = require("./routes/vacuums");
var airConditioners = require("./routes/conditioners");
var ovens = require("./routes/ovens");
var fridges = require("./routes/fridges");
var washingMachines = require("./routes/washingMachines");
var logout = require("./routes/logout");
var admin = require('./routes/admin');
var checkSes = require('./routes/checkSession')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', './images/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'Yoana', maxAge: 600000, store: new MongoStore({ url: 'mongodb://angelov21:plf13017@ds237445.mlab.com:37445/final-project', autoRemove: 'native', ttl: 1 * 1 * 5 * 60 }) }));




function reqAdmin(req, res, next) {
    if (req.session.user.permission == 'admin') {
        next();
    } else {
        res.sendStatus(401);

    }
};
app.use('/sessioncheck', checkSes)
app.use('/login', login);
app.use('/admin', admin);
app.use("/api/phones", phones);
app.use('/api/registration', registration);
app.use("/api/tvs", tvs);
app.use("/api/computers", computers);
app.use("/api/microwave-ovens", microwaveOvens);
app.use("/api/vacuumCleaners", vacuumCleaners);
app.use("/api/conditioners", airConditioners);
app.use("/api/ovens", ovens);
app.use("/api/fridges", fridges);
app.use("/api/washing-machines", washingMachines);
app.use("/api/logout", logout);
app.all("/*", function(req, res, next) {
    res.sendFile("index.html", { root: __dirname + "/public" });
});


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