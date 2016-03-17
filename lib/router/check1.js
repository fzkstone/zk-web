'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //検索系
  router.route('/getInfo')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const result = {
      result: true,
      data: [
        {
          information: '本日のお知らせ'
        }
      ]
    };
    res.status(200).json(result);
  });
};