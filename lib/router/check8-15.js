'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {

  //check8
  router.route('/findItemOwner')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const itemId = req.query.targetItemId;
    service.user.getAll((err, rows) => {
      if (err) {
        return next(err);
      }
      const data = _.find(rows, (obj) => {
        return _.includes(obj.playerItems, itemId);
      });
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