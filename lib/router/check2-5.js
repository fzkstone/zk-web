'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check2
  router.route('/readPlayer')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const id = req.query.targetPlayerId;
    service.user.getPlayerById(id, (err, data) => {
      if (err) {
        return next(err);
      }
      const result = {
        result: true,
        data: [
          data
        ]
      };
      console.log(result);
      res.status(200).json(result);
    });
  });
};