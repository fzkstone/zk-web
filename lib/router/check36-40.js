'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check36
  router.route('/challenge4')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerIds = req.query.playerIds.split(',');
    const player1 = playerIds[0];
    const player2 = playerIds[1];
    async.angelFall([
      (next) => {
        async.parallel({
          player1: (done) => {
            service.user.getPlayerById(player1, done);
          },
          player2: (done) => {
            service.user.getPlayerById(player2, done);
          },
          items: (done) => {
            service.item.getAll(done);
          }
        }, next);
      },
      (data, next) => {
        const itemMap = {};
        _.each(data.items, (item) => {
          itemMap[item.itemId] = item.itemValue;
        });
        let player1value = 0;
        let player2value = 0;
        let player1exp = data.player1.playerExp;
        let player2exp = data.player2.playerExp;

        if (_.isEmpty(data.player1.playerItems) || _.isEmpty(data.player2.playerItems)) {
          res.status(200).json({ result: false });
          return;
        }

        const player1item = _.max(data.player1.playerItems, (itemId) => {
          return itemMap[itemId] || 0;
        });
        player1value = itemMap[player1item];

        const player2item = _.max(data.player2.playerItems, (itemId) => {
          return itemMap[itemId] || 0;
        });
        player2value = itemMap[player2item];
        console.log('item1', player1item);
        console.log('item2', player2item);
        console.log('val1', player1value);
        console.log('val1', player2value);

        if (player1value > player2value) {
          let diff = player1value - player2value;
          diff = Math.min(diff, player2exp);
          player1exp = player1exp + diff;
          player2exp = player2exp - diff;
        } else {
          let diff = player2value - player1value;
          diff = Math.min(diff, player1exp);
          player1exp = player1exp - diff;
          player2exp = player2exp + diff;
        }
        const player1itemList = _.without(data.player1.playerItems, player1item);
        player1itemList.push(player2item);
        const player2itemList = _.without(data.player2.playerItems, player2item);
        player2itemList.push(player1item);

        async.parallel({
          player1: (done) => {
            service.user.updatePlayer(player1, {
              playerExp: player1exp,
              playerItems: player1itemList.join(',')
            }, done);
          },
          player2: (done) => {
            service.user.updatePlayer(player2, {
              playerExp: player2exp,
              playerItems: player2itemList.join(',')
            }, done);
          },
        }, next);
      },
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.player1.playerId,
          apiPath: 'challenge4',
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
      //userlog
      (data, next) => {
        const logParams = {
          playerId: data.player2.playerId,
          apiPath: 'challenge4',
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
    ], (err, data) => {
      if (err) {
        return next(err);
      }
      const result = {
        result: true,
        data: [ data.player1, data.player2 ]
      };
      console.log(result);
      res.status(200).json(result);
    });
  });

  //check37
  router.route('/challenge4')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const mapId = req.query.targetMapId;
    const rankParam = req.query.rankParam;
    const isStrong = rankParam === 'Strong';
    const target = 'player' + rankParam;

    async.angelFall([
      (next) => {
        service.player.getAll(next);
      },
      (players, next) => {
        const filterd = _.filter(players, (player) => {
          return player.playerMap === mapId;
        });
        const sorted = _.sortBy(filterd, (player) => {
          if (isStrong) {
            return -service.user.calcStrong(player);
          } else {
            return -player[target];
          }
        });
        let loopCount = Math.floor(sorted.length / 2);

        const series = [];

        for (let i = 0; i < loopCount; i++) {
          const player1 = sorted[i];
          const player2 = sorted[sorted.length - 1 - i];
          const initialHp = player2.playerHp;
          const damage = service.user.calcDamage(player1, player2);
          player2.playerHp = player2.playerHp - damage;
          if (player2.playerHp <= 0) {
            player2.playerHp = 0;
            if (!_.isEmpty(player2.playerItems)) {
              player2.playerItems.shift();
              player2.playerHp = initialHp;
            }
          }
          series.push((next) => {
            service.user.updatePlayer(player2.playerId, {
              playerHp: player2.playerHp,
              playerItems: player2.playerItems.join(',')
            }, next);
          });
        }
        async.series(series, (err) => {
          if (err) {
            return next(err);
          }
          return next(null, sorted);
        });
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