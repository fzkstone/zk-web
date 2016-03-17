'use strict';

const _ = require('lodash');
const async = require('neo-async');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routerService = require('./router');
const express = require('express');
const router = express.Router();

module.exports = (app, config) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    console.log('====================');
    console.log(req.path, req.method);
    console.log('query', req.query);
    console.log('body', req.body);
    console.log('====================');
    return next();
  });

  routerService(router);
  app.use(router);
};