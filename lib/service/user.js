'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');
const master = require('../master/data');

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
      query = `${query} where playerId = ${id}`;
      mysql.query(query, next);
    },
    (data, next) => {
      getPlayerById(id, next);
    }
  ], callback);
};
exports.updatePlayer = updatePlayer;


