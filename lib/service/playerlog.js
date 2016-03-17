'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');
require('date-utils');


const getPlayerLogByPlayerId = (id, callback) => {
  const query = `select * from playerlog where playerId = '${id}'`;
  mysql.query(query, (err, rows) => {
    if (err) {
      return callback(err);
    }

    rows = _.take(_.sortBy(rows, (row) => {
      return -row.logDateTime;
    }), 20);

    _.each(rows, (row) => {
      const dt = new Date(row.logDateTime);
      const formatted = dt.toFormat('YYYY-MM-DD-HH24:MI:SS');
      row.logDateTime = formatted;
    });
    return callback(null, rows);
  });
};
exports.getPlayerLogByPlayerId = getPlayerLogByPlayerId;

const addLog = (data, callback) => {
  let query = 'insert into playerlog ( ';
  let insData = '';
  _.each(data, (val, key) => {
    query = `${query} ${key},`;
    insData = `${insData} '${val}',`;
  });
  // 後半一文字削除
  query = query.substr(0, query.length - 1);
  insData = insData.substr(0, insData.length - 1);
  query = `${query}) values ( ${insData} )`;

  mysql.query(query, callback);
};
exports.addLog = addLog;


