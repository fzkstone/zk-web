'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {

  //check8
  router.route('/findItemOwner')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
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
      res.status(200).json(result);
    });
  });

};