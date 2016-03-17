'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');

const getAll = (callback) => {
  const query = 'select * from item';
  mysql.query(query, callback);
};
exports.getAll = getAll;

const getItemById = (id, callback) => {
  const query = `select * from item where itemId = '${id}'`;
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
    return callback(null, res);
  });
};
exports.getItemById = getItemById;

const updateItem = (id, data, callback) => {
  async.angelFall([
    (next) => {
      let query = 'update item set';
      _.each(data, (val, key) => {
        query = `${query} ${key}='${val}',`;
      });
      // 後半一文字削除
      query = query.substr(0, query.length - 1);
      query = `${query} where itemId = '${id}'`;
      mysql.query(query, next);
    },
    (data, next) => {
      getItemById(id, next);
    }
  ], callback);
};
exports.updateItem = updateItem;