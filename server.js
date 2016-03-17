'use_strict';
const express = require('express');
const path = require('path');
const _ = require('lodash');
const async = require('neo-async');
const mysql = require('./lib/db/mysql');
const config = require('./conf/local');

const app = express();
app.disable('x-powered-by');

console.log('setup mysql');
mysql.setup(config.mysql);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

require('./lib/app')(app, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(200).json({ result: false });
  /**res.status(err.status || 500).send({
    message: err.message,
    error: err
  });*/
});

module.exports = app;
