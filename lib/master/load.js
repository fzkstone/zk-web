'use strict';

const _ = require('lodash');
const mysql = require('../db/mysql');
const async = require('neo-async');
const data = require('./data');

const collections = [
  //{ name: 'book', keys: ['id'] },
  //{ name: 'author', keys: ['id'] },
  //{ name: 'category', keys: ['id'] },
];

module.exports = (callback) => {
  async.eachSeries(collections, (obj, next) => {
    console.log(`create ${obj.name} master`);
    const query = `select * from ${obj.name}`;
    mysql.query(query, (err, rows) => {
      if (err) {
        return next(err);
      }
      data[obj.name] = {};
      _.each(rows, (row) => {
        let map = data[obj.name];
        for (let i = 0; i < obj.keys.length; i++) {
          const key = obj.keys[i];
          const target = row[key];
          map[target] = map[target] || {};
          if (i === obj.keys.length - 1) {
            map[target] = _.cloneDeep(row);
          } else {
            map = map[target];
          }
        }
      });
      return next();
    });
  }, (err) => {
    if (err) {
      return callback(err);
    }
    return callback();
  });
};