// Modules
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

// Init App Express
var app = express();

// View Engine Setup
app.engine("hbs", hbs.express4({
  partialsDir: path.join(__dirname, "../views/partials"),
  layoutsDir: path.join(__dirname, "../views/layouts")
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use('/src', express.static('public'));

// Favicon
app.use(favicon(path.join(__dirname, '../public', 'favicon/favicon.png')));

// Logger
app.use(logger('dev'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Cookie Parser
app.use(cookieParser());

// Setup Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Helper
var helper = {};
fs.readdirSync(path.join(__dirname, "../helper")).forEach(function (file) {
  var hlp;
  if (file.substr(-3) == ".js") {
    hlp = require("../helper/" + file);
    if (typeof hlp == "function") {
      hlp(hbs);
    }
  }
});

// Middleware
fs.readdirSync(path.join(__dirname, "../middleware")).forEach(function (file1) {
  var route1;
  if (file1.substr(-3) == ".js") {
    route1 = require("../middleware/" + path.basename(file1, '.js'));
    app.use(route1.path, route1.router);
  }
  if (path.extname(file1) == "") {
    fs.readdirSync(path.join(__dirname, "../middleware/" + file1)).forEach(function (file2) {
      var route2;
      if (file2.substr(-3) == ".js") {
        route2 = require("../middleware/" + file1 + "/" + path.basename(file2, '.js'));
        app.use(route2.path, route2.router);
      }
      if (path.extname(file2) == "") {
        fs.readdirSync(path.join(__dirname, "../middleware/" + file1 + "/" + file2)).forEach(function (file3) {
          var route3;
          if (file3.substr(-3) == ".js") {
            route3 = require("../middleware/" + file1 + "/" + file2 + "/" + path.basename(file3, '.js'));
            app.use(route3.path, route3.router);
          }
        })
      }
    })
  }
});

// Controller
fs.readdirSync(path.join(__dirname, "../controllers")).forEach(function (file1) {
  var route1;
  if (file1.substr(-3) == ".js") {
    route1 = require("../controllers/" + path.basename(file1, '.js'));
    app.use(route1.path, route1.router);
  }
  if (path.extname(file1) == "") {
    fs.readdirSync(path.join(__dirname, "../controllers/" + file1)).forEach(function (file2) {
      var route2;
      if (file2.substr(-3) == ".js") {
        route2 = require("../controllers/" + file1 + "/" + path.basename(file2, '.js'));
        app.use(route2.path, route2.router);
      }
      if (path.extname(file2) == "") {
        fs.readdirSync(path.join(__dirname, "../controllers/" + file1 + "/" + file2)).forEach(function (file3) {
          var route3;
          if (file3.substr(-3) == ".js") {
            route3 = require("../controllers/" + file1 + "/" + file2 + "/" + path.basename(file3, '.js'));
            app.use(route3.path, route3.router);
          }
        })
      }
    })
  }
});

// Error Handler 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development Error Handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Exports
module.exports = app;