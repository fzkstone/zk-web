'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');

const getAll = (callback) => {
  const query = 'select * from player';
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }

    _.each(rows, (row) => {
      if (row.playerItems) {
        row.playerItems = row.playerItems.split(',');
      }
    });
    return callback(null, rows);
  });
};
exports.getAll = getAll;

const getPlayerById = (id, callback) => {
  const query = `select * from player where playerId = '${id}'`;
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }
    if (_.isEmpty(rows)) {
      const error = new Error('not_found');
      error.status = 404;
      return callback(error);
    }
    const res = rows[0];
    if (res.playerItems) {
      res.playerItems = res.playerItems.split(',');
    }
    return callback(null, res);
  });
};
exports.getPlayerById = getPlayerById;

const updatePlayer = (id, data, callback) => {
  async.angelFall([
    (next) => {
      let query = 'update player set';
      _.each(data, (val, key) => {
        query = `${query} ${key}='${val}',`;
      });
      // 後半一文字削除
      query = query.substr(0, query.length - 1);
      query = `${query} where playerId = '${id}'`;
      mysql.query(query, next);
    },
    (data, next) => {
      getPlayerById(id, next);
    }
  ], callback);
};
exports.updatePlayer = updatePlayer;

const calcStrong = (obj) => {
  return (obj.playerHp + obj.playerMp) * (obj.playerAtk * obj.playerHp + obj.playerInt * obj.playerMp) * obj.playerDef * obj.playerAgi;
};
exports.calcStrong = calcStrong;

const calcDamage = (p1, p2) => {
  if (p1.playerAtk >= p1.playerInt) {
    return Math.max(1, p2.playerAtk - p2.playerDef) * Math.max(1, p1.playerAgi - p2.playerAgi);
  } else {
    return Math.max(1, p2.playerInt - p2.playerInt) * Math.floor(p1.playerMp * 0.1);
  }
};
exports.calcDamage = calcDamage;


