/**
 * Created by TRAN CHI TAM on 5/10/2015.
 */

var mongoose = require('mongoose-q')();
var dbConfig = require('./config/dbconfig');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var multer = require('multer');
var engine = require('ejs-locals');
var I18n = require('i18n-2');
var path = require('path');
var i18nConfig = require('./config/i18n');
var restApi = require('./rest');
var authorize = require('./services/authorizer').authorize;

var app = express();

// Set environment variables
app.set('db', dbConfig.address);
app.set('port', process.env.port || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'api')));
app.use('/', express.static(__dirname + '/client'));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use((bodyParser.urlencoded({extended: true})));
app.use(cookieParser());
app.use(multer());
app.use(methodOverride());

app.engine('ejs', engine);

// Development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// i18n configuration
I18n.expressBind(app, i18nConfig);
app.use(function (req, res, next) {
    req.i18n.setLocaleFromCookie();
    req.i18n.setLocaleFromQuery();
    next();
});

app.use(function (req, res, next) {
    var pageNumber = req.query.page;
    var pageSize = Math.abs(req.query.size);
    if (pageNumber && pageSize) {
        pageNumber = pageNumber > 0 ? pageNumber : 1;
        req.pagination = {skip: (pageNumber - 1) * pageSize, size: pageSize};
    }
    next();
});

app.all('/*', function (req, res, next) {
    // CORS configuration
    res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


// Rest APIs

// Authentication
app.post('/api/login', restApi.auth.login);
app.post('/api/logout', authorize(), restApi.auth.logout);

// User
app.get('/api/user', authorize('ADMIN'), restApi.user.getAll);
app.get('/api/user/:id', authorize('ADMIN'), restApi.user.get);
app.post('/api/user', authorize('ADMIN'), restApi.user.create);
app.put('/api/user/:id', authorize('ADMIN'), restApi.user.update);
app.delete('/api/user/:id', authorize('ADMIN'), restApi.user.delete);

// Task
app.get('/api/task', authorize(), restApi.task.getAll);
app.get('/api/task/:id', authorize(), restApi.task.getById);
app.get('/api/task/userId/:userId', authorize(), restApi.task.getByUserId);
app.post('/api/task', authorize(), restApi.task.create);
app.put('/api/task/:id', authorize(), restApi.task.update);
app.delete('/api/task/:id', authorize(), restApi.task.delete);

// Connect database
mongoose.connect(app.get('db'));

// Start DSM Server
app.listen(app.get('port'), function () {
    console.log('DSM server started at port ' + app.get('port'));
});