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
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check9
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
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.playerId,
          apiPath: 'switchItemOwner',
          apiParam: JSON.stringify(req.query),
          logDateTime: Date.now(),
        };
        service.playerlog.addLog(logParams, (err) => {
          if (err) {
            return next(err);
          }
          return next(null, data);
        });
      },
      //itemlog
      (data, next) => {
        const logParams = {
          itemId: itemId,
          apiPath: 'switchItemOwner',
          apiParam: JSON.stringify(req.query),
          logDateTime: Date.now(),
        };
        service.itemlog.addLog(logParams, (err) => {
          if (err) {
            return next(err);
          }
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
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check10
  router.route('/getPlayerLog')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const id = req.query.targetPlayerId;
    async.angelFall([
      (next) => {
        service.playerlog.getPlayerLogByPlayerId(id, next);
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
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check11
  router.route('/getItemLog')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const id = req.query.targetItemId;
    async.angelFall([
      (next) => {
        service.itemlog.getItemLogByItemId(id, next);
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
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check12
  router.route('/movePlayer')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const mapId = req.query.targetMapId;
    async.angelFall([
      (next) => {
        async.parallel({
          player: (done) => {
            service.user.getPlayerById(playerId, done);
          },
          map: (done) => {
            service.map.getMapById(mapId, done);
          }
        }, next);
      },
      (data, next) => {
        const mapData = data.map;
        const playerData = data.player;
        if (!_.contains(mapData.mapNext, playerData.playerMap) {
          res.status(200).json({ result: false });
          return;
        }
        return next(null, playerData);
      },
      // playerlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'movePlayer',
          apiParam: JSON.stringify(req.query),
          logDateTime: Date.now(),
        };
        service.playerlog.addLog(logParams, (err) => {
          if (err) {
            return next(err);
          }
          return next(null, playerData);
        });
      },
      (playerData, next) => {
        const updateId = playerData.playerId;
        const updateData = { playerMap: targetMapId };
        service.user.updateUser(updateId, updateData, next);
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
      console.log(result);
      res.status(200).json(result);
    });
  });


};







