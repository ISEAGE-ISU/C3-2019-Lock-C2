var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// This MUST come before any imports of app-defined things.
// Failure to do so is known to make things crash hard
global.app_settings = require('./config');
var db = require('./src/db_wrapper');
db.test_bd();

var setup_admin = require('./src/utils');
setup_admin.setup_admin();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
require('ip_serializer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.locals = require("./config");
var middleware = {
    globalsettings: function (req, res, next) {
        res.locals = (require("./config"));
        next()
    }
};

app.use(middleware.globalsettings);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/help', require("./routes/help"));
app.use('/manage', require("./routes/manage"));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = "eat pant";
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // see 7xx.txt, a copy of the 700 series RFC
    err.status = (err.status % 100) + 700;
    res.status(err.status || 767);
    res.render('error');
});

module.exports = app;
