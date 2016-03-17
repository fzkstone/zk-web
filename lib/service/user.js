'use strict';

const _ = require('lodash');
const async = require('neo-async');
const mysql = require('../db/mysql');
const master = require('../master/data');

exports.getPlayerById = (id, callback) => {
  const query = `select * from player where id = ${id}`;
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
