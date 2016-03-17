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
        data: data
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
    const mapId = req.query.newPlayerMapId;
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (player, next) => {
        const nowMapId = player.playerMap;
        service.map.getMapById(nowMapId, next);
      },
      (map, next) => {
        if (mapId !== map.mapId || !_.contains(map.mapNext, mapId)) {
          res.status(200).json({ result: false });
          return;
        }
        service.user.updatePlayer(playerId, {
          playerMap: mapId
        }, next);
      },
      // playerlog
      (playerData, next) => {
        const logParams = {
          playerId: playerId,
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
        const updateData = { playerMap: mapId };
        service.user.updateUser(updateId, updateData, next);
      }
    ], (err, data) => {
      if (err) {
        return next(err);
      }
      const result = {
        result: true,
        data: data
      };
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check13
  router.route('/exploreMap')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        const mapId = playerData.playerMap;
        service.map.getMapById(mapId, (err, mapData) => {
          if (err) {
            return next(err);
          }
          if (_.isEmpty(mapData.mapItems)) {
            res.status(200).json({ result: false });
            return;
          }
          const itemId = mapData.mapItems[0];
          service.item.getItemById(itemId, (err, itemData) => {
            if (err) {
              return next(err);
            }
            return next(null, {
              item: itemData,
              map: mapData,
              player: playerData,
            });
          });
        });
      },
      (data, next) => {
        const playerId = data.player.playerId;
        const itemId = data.item.itemId;
        const mapId = data.map.mapId;
        const mapItems = _.without(data.map.mapItems, itemId);
        let itemValue = data.item.itemValue;
        itemValue = Math.max(0, itemValue - 10);
        const playerItems = data.player.playerItems || [];
        playerItems.push(itemId);

        async.parallel({
          player: (done) => {
            service.user.updatePlayer(playerId, {
              playerItems: playerItems.join(',')
            }, done);
          },
          map: (done) => {
            service.map.updateMap(mapId, {
              mapItems: mapItems.join(',')
            }, done);
          },
          item: (done) => {
            service.item.updateItem(itemId, {
              itemValue: itemValue
            }, done);
          }
        }, next);
      },
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.player.playerId,
          apiPath: 'exploreMap',
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
          itemId: data.item.itemId,
          apiPath: 'exploreMap',
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
    ], (err, data) => {
      if (err) {
        return next(err);
      }
      const result = {
        result: true,
        data: [
          data.player
        ]
      };
      console.log(result);
      res.status(200).json(result);
    });
  });

//check14
  router.route('/hideItem')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        const mapId = playerData.playerMap;
        service.map.getMapById(mapId, (err, mapData) => {
          if (err) {
            return next(err);
          }
          if (_.isEmpty(playerData.playerItems)) {
            res.status(200).json({ result: false });
            return;
          }
          const itemId = playerData.playerItems[0];
          service.item.getItemById(itemId, (err, itemData) => {
            if (err) {
              return next(err);
            }
            return next(null, {
              item: itemData,
              map: mapData,
              player: playerData,
            });
          });
        });
      },
      (data, next) => {
        const playerId = data.player.playerId;
        const itemId = data.item.itemId;
        const mapId = data.map.mapId;
        const playerItems = _.without(data.player.playerItems, itemId);
        let itemValue = data.item.itemValue;
        itemValue = Math.max(65535, itemValue + 10);
        const mapItems = data.map.mapItems || [];
        mapItems.push(itemId);

        async.parallel({
          player: (done) => {
            service.user.updatePlayer(playerId, {
              playerItems: playerItems.join(',')
            }, done);
          },
          map: (done) => {
            service.map.updateMap(mapId, {
              mapItems: mapItems.join(',')
            }, done);
          },
          item: (done) => {
            service.item.updateItem(itemId, {
              itemValue: itemValue
            }, done);
          }
        }, next);
      },
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.player.playerId,
          apiPath: 'hideItem',
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
          itemId: data.item.itemId,
          apiPath: 'hideItem',
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
    ], (err, data) => {
      if (err) {
        return next(err);
      }
      const result = {
        result: true,
        data: [
          data.player
        ]
      };
      console.log(result);
      res.status(200).json(result);
    });
  });
};







