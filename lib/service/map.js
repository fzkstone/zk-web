'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');

const getAll = (callback) => {
  const query = 'select * map player';
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }

    _.each(rows, (row) => {
      if (row.mapItems) {
        row.mapItems = row.mapItems.split(',');
      }

      if (row.mapNext) {
        row.mapNext = row.mapNext.split(',');
      }
    });
    return callback(null, rows);
  });
};
exports.getAll = getAll;

const getMapById = (id, callback) => {
  const query = `select * from map where mapId = '${id}'`;
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
    if (res.mapItems) {
      res.mapItems = res.mapItems.split(',');
    }
    if (res.mapNext) {
      res.mapNext = res.mapNext.split(',');
    }
    return callback(null, res);
  });
};
exports.getMapById = getMapById;

const updateMap = (id, data, callback) => {
  async.angelFall([
    (next) => {
      let query = 'update map set';
      _.each(data, (val, key) => {
        query = `${query} ${key}='${val}',`;
      });
      // 後半一文字削除
      query = query.substr(0, query.length - 1);
      query = `${query} where mapId = ${id}`;
      mysql.query(query, next);
    },
    (data, next) => {
      getMapById(id, next);
    }
  ], callback);
};
exports.updateMap = updateMap;