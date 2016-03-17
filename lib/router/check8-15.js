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

  //check8
  router.route('/switchItemOwner')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const itemId = req.query.targetItemId;
    async.angelFall([
      (next) => {
        service.user.getAll((err, rows) => {
          if (err) {
            return next(err);
          }
          const data = _.find(rows, (obj) => {
            return _.includes(obj.playerItems, itemId);
          });
          return next(null, data);
        });
      },
      (data, next) => {
        const id = data.playerId;
        const params = _.omit(data, 'playerId');
        params.playerItems = _.without(params.playerItems, itemId).join(',');

        service.user.updatePlayer(id, params, next);
      },
      (data, next) => {
        const newItemOwner = req.query.newItemOwner;
        if (newItemOwner === 'none') {
          return next(null);
        }
        service.user.getPlayerById(newItemOwner, next);
      },
      (data, next) => {
        if (!data) {
          return next(null);
        }
        const id = data.playerId;
        const params = _.omit(data, 'playerId');
        params.playerItems = params.playerItems || [];
        params.playerItems.push(itemId);
        params.playerItems = params.playerItems.join(',');
        service.user.updatePlayer(id, params, next);
      }
    ], (err, data) => {
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