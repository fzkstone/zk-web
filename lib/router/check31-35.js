'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check31
  router.route('/useItem')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        if (_.isEmpty(playerData.playerItems)) {
          res.status(200).json({ result: false });
          return;
        }
        const itemId = playerData.playerItems[0];
        service.user.getItemById(itemId, (err, itemData) => {
          if (err) {
            return next(err);
          }
          return next(null, {
            player: playerData,
            item: itemData
          });
        });
      },
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.player.playerId,
          apiPath: 'useItem',
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
          apiPath: 'useItem',
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
        const itemId = data.item.itemId;
        const playerId = data.player.playerId;
        const itemValue = Math.min(65535, data.item.itemValue + 10);
        const playerItems = _.without(data.player.playerItems, itemId);
        const target = 'player' + data.item.itemEffectTarget;
        let targetValue = data.player[target] + data.item.itemEffectValue;
        targetValue = Math.max(0, targetValue);
        if (target === 'playerExp') {
          targetValue = Math.max(65535, targetValue);
        } else {
          targetValue = Math.max(255, targetValue);
        }
        async.angelFall({
          player: (done) => {
            service.user.updatePlayer(playerId, {
              playerItems: playerItems.join(','),
              [target]: targetValue
            }, done);
          },
          item: (done) => {
            service.item.updateItem(itemId, {
              itemValue: itemValue
            }, done);
          },
        }, next);
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

  //check32
  router.route('/rankPlayerByItemValue')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        async.parallel({
          player: (done) => {
            service.user.getAll(done);
          },
          item: (done) => {
            service.item.getAll(done);
          }
        }, next);
      },
      (data, next) => {
        const itemMap = {};
        _.each(data.item, (item) => {
          itemMap[item.itemId] = item.itemValue;
        });
        const result = _.take(_.sortBy(data.player, (player) => {
          let val = 0;
          _.each(player.playerItems, (itemId) => {
            val = val + itemMap[itemId] || 0;
          });
          if (isAscend) {
            return val;
          } else {
            return -val;
          }
        }), 20);
        return next(null, result);
      },
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
};