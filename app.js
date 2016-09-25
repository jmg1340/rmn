// Importacio de Middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Importar enrutadors
var routes = require('./routes/index');

// Creacio de l'aplicacio
var app = express();

// view engine setup. Instalar generador de vistes EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// INSTALACIO DE MIDDLEWARES
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Instalacio d'enrutadors. Associar rutes als seus gestors
app.use('/', routes);

// La resta de rutes genera error 404 de HTTP
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// Gestio d'errors durant el desenvolupament
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

// Gestio d'errors en produccio
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Exportar app per al comandament d'arranc
module.exports = app;
