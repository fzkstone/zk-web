'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check22
  router.route('/rankPlayerHp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerHp;
          } else {
            return -player.playerHp;
          }
        }), 20);
        return next(null, data);
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

  //check23
  router.route('/rankPlayerMp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerMp;
          } else {
            return -player.playerMp;
          }
        }), 20);
        return next(null, data);
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

//check24
  router.route('/rankPlayerExp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerExp;
          } else {
            return -player.playerExp;
          }
        }), 20);
        return next(null, data);
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

//check25
  router.route('/rankPlayerAtk')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerAtk;
          } else {
            return -player.playerAtk;
          }
        }), 20);
        return next(null, data);
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

  //check26
  router.route('/rankPlayerDef')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerDef;
          } else {
            return -player.playerDef;
          }
        }), 20);
        return next(null, data);
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

  //check27
  router.route('/rankPlayerInt')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerInt;
          } else {
            return -player.playerInt;
          }
        }), 20);
        return next(null, data);
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

//check28
  router.route('/rankPlayerAgi')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.take(_.sortBy(players, (player) => {
          if (isAscend) {
            return player.playerAgi;
          } else {
            return -player.playerAgi;
          }
        }), 20);
        return next(null, data);
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

//check29
  router.route('/rankItemValue')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const isAscend = req.query.isAscend;
    async.angelFall([
      (next) => {
        service.item.getAll(next);
      },
      (items, next) => {
        const data = _.take(_.sortBy(items, (item) => {
          if (isAscend) {
            return item.itemValue;
          } else {
            return -item.itemValue;
          }
        }), 20);
        return next(null, data);
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

  //check30
  router.route('/listPlayerOnMap')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const mapId = req.query.targetMapId;
    async.angelFall([
      (next) => {
        service.user.getAll(next);
      },
      (players, next) => {
        const data = _.filter(players, (player) => {
          return player.playerMap === mapId;
        });
        return next(null, data);
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