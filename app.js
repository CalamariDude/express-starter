var express = require('express')
  , hbs = require('hbs')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , routes = require('./routes/index')
  , conf = require('./conf/conf')
  ;

var app = express();

// view engine setup
app.set('view engine', 'hbs');
app.set("view options", { layout: false });

// Handlebars helpers and partials
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('stringify', function (data) {
  return JSON.stringify(data);
});

hbs.registerHelper("debug", function(value) {
  if (value) {
    console.log("=== Value ===");
    console.log(optionalValue);
    console.log("=============");
  }
  else {
    console.log("=== Current Context ===");
    console.log(this);
    console.log("=======================");
  }
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
