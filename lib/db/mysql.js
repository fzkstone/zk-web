'use strict';

let _pool;
const _ = require('lodash');

exports.setup = function(config) {
  var mysql = require('mysql');
  _pool = mysql.createPool(config);
};

exports.query = (query, callback) => {
  console.log('QUERY: ' + query);
  _pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(query, function(err, rows) {
      if (err) {
        return callback(err);
      }
      return callback(null, rows);
    });
  });
};