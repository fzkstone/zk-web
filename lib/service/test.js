'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');
const master = require('../master/data');

exports.getBook = (id, callback) => {
  const query = `select * from book where id = ${id}`;
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }
    if (_.isEmpty(rows)) {
      const error = new Error('not_found');
      error.status = 404;
      return callback(error);
    }
    return callback(null, rows[0]);
  });
};

exports.updateBook = (id, data, callback) => {
  let query = 'update book set';
  _.each(data, (val, key) => {
    query = `${query} ${key}='${val}',`;
  });
  // 後半一文字削除
  query = query.substr(0, query.length - 1);
  query = `${query} where id = ${id}`;
  mysql.query(query, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

exports.deleteBook = (id, callback) => {
  const query = `delete from book where id = ${id}`;
  mysql.query(query, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

exports.addBook = (id, data, callback) => {
  async.angelFall([
    // 存在チェック
    (next) => {
      const query = `select * from book where id = ${id}`;
      mysql.query(query, (err, rows) => {
        if (err) {
          return callback(err);
        }
        if (!_.isEmpty(rows)) {
          const error = new Error('already_exist');
          error.status = 204;
          return next(error);
        }
        return next();
      });
    },
    (next) => {
      let query = 'insert into book ( id,';
      let insData = `${id},`;
      _.each(data, (val, key) => {
        query = `${query} ${key},`;
        insData = `${insData} '${val}',`;
      });
      // 後半一文字削除
      query = query.substr(0, query.length - 1);
      insData = insData.substr(0, insData.length - 1);
      query = `${query}) values ( ${insData} )`;

      mysql.query(query, next);
    }
  ], callback);
};


// いい感じの検索
exports.listBook = (data, callback) => {
  let isAnd = false;
  let query = 'select * from book where';
  if (data.title) {
    query = isAnd ? `${query} AND` : query;
    query = `${query} title like '%${data.title}%'`;
    isAnd = true;
  }
  if (data.category_id) {
    query = isAnd ? `${query} AND` : query;
    query = `${query} category_id = ${data.category_id}`;
    isAnd = true;
  }
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }
    if (_.isEmpty(rows)) {
      const error = new Error('not_found');
      error.status = 404;
      return callback(error);
    }
    return callback(null, rows);
  });
};

exports.addIncretest = (data, callback) => {
  async.angelFall([
    (next) => {
      let query = 'insert into incretest (';
      let insData = '';
      _.each(data, (val, key) => {
        query = `${query} ${key},`;
        insData = `${insData} '${val}',`;
      });
      // 後半一文字削除
      query = query.substr(0, query.length - 1);
      insData = insData.substr(0, insData.length - 1);
      query = `${query}) values ( ${insData} )`;

      mysql.query(query, next);
    }
  ], callback);
};
