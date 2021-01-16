require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
var Sequelize = require('sequelize')
var bcryptjs = require('bcryptjs')
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'Default_Layout', layoutDir: __dirname + '/views/layouts/', runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true } }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true
    }
}))
// session login
app.use(function(req, res, next) {
    if (req.session.isAuth === null || req.session.isAuth === undefined) {
        req.session.isAuth = false;
    }

    res.locals.IsAuth = req.session.isAuth;
    res.locals.AuthUser = req.session.authUser;
    res.locals.IsAdmin  = req.session.isAdmin;
    res.locals.IsTeacher = req.session.isTeacher;
    next();
});

app.use(express.static('public'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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