'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //check15
  router.route('/updatePlayerHp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerHp = playerData.playerHp + calcValue;
        playerHp = Math.min(255, playerHp);
        playerHp = Math.max(0, playerHp);
        service.user.updatePlayer(playerId, {
          playerHp: playerHp
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerHp',
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

//check16
  router.route('/updatePlayerMp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerMp = playerData.playerMp + calcValue;
        playerMp = Math.min(255, playerMp);
        playerMp = Math.max(0, playerMp);
        service.user.updatePlayer(playerId, {
          playerMp: playerMp
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerMp',
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

//check17
  router.route('/updatePlayerExp')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerExp = playerData.playerExp + calcValue;
        playerExp = Math.min(65535, playerExp);
        playerExp = Math.max(0, playerExp);
        service.user.updatePlayer(playerId, {
          playerExp: playerExp
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerExp',
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

//check18
  router.route('/updatePlayerAtk')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerAtk = playerData.playerAtk + calcValue;
        playerAtk = Math.min(255, playerAtk);
        playerAtk = Math.max(0, playerAtk);
        service.user.updatePlayer(playerId, {
          playerAtk: playerAtk
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerAtk',
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

//check19
  router.route('/updatePlayerDef')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerDef = playerData.playerDef + calcValue;
        playerDef = Math.min(255, playerDef);
        playerDef = Math.max(0, playerDef);
        service.user.updatePlayer(playerId, {
          playerDef: playerDef
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerDef',
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

//check20
  router.route('/updatePlayerInt')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerInt = playerData.playerInt + calcValue;
        playerInt = Math.min(255, playerInt);
        playerInt = Math.max(0, playerInt);
        service.user.updatePlayer(playerId, {
          playerInt: playerInt
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerInt',
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

//check21
  router.route('/updatePlayerAgi')
  .get((req, res, next) => {
    res.set('Content-Type', 'application/json');
    const playerId = req.query.targetPlayerId;
    const calcValue = Number(req.query.calcValue);
    async.angelFall([
      (next) => {
        service.user.getPlayerById(playerId, next);
      },
      (playerData, next) => {
        let playerAgi = playerData.playerAgi + calcValue;
        playerAgi = Math.min(255, playerAgi);
        playerAgi = Math.max(0, playerAgi);
        service.user.updatePlayer(playerId, {
          playerAgi: playerAgi
        }, next);
      },
      //userlog
      (playerData, next) => {
        const logParams = {
          playerId: playerData.playerId,
          apiPath: 'updatePlayerAgi',
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