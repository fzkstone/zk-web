'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check2
  router.route('/readPlayer')
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

  //check3
  router.route('/updatePlayer')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const params = {};
    _.each(_.omit(req.query, 'targetPlayerId'), (val, key) => {
      key = key.substr(3, key.length);
      params[key] = val;
    });
    const id = req.query.targetPlayerId;

    async.angelFall([
      (next) => {
        const data = {
          playerId: id,
          apiPath: 'updatePlayer',
          apiParam: JSON.stringify(req.query),
          logDateTime: Date.now()
        };
        service.playerlog.addLog(data, next);
      },
      (next) => {
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

  //check4
  router.route('/readMap')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const id = req.query.targetMapId;
    service.map.getMapById(id, (err, data) => {
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

  //check5
  router.route('/updateMap')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const params = { mapitems: req.query.newMapItems };
    const id = req.query.targetMapId;

    service.map.updateMap(id, params, (err, data) => {
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

//check6
  router.route('/readItem')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const id = req.query.targetItemId;
    service.item.getItemById(id, (err, data) => {
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

  //check7
  router.route('/updateItem')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const params = { itemValue: req.query.newItemValue };
    const id = req.query.targetItemId;
    async.angelFall([
      (next) => {
        const logParams = {
          itemId: id,
          apiPath: 'updateItem',
          apiParam: JSON.stringify(req.query),
          logDateTime: Date.now()
        };
        service.itemlog.addLog(logParams, next);
      },
      (next) => {
        service.item.updateItem(id, params, next);
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