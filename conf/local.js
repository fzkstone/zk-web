'use strict';

module.exports = {
  port: 80,
  test: {
    uri: 'http://127.0.0.1:80'
  },
  mysql: {
    host: '127.0.0.1',
    user: 'tqdbuser',
    password: 'hoge',
    connectionLimit: 100,
    port: 3306,
    database: 'tquest',
    enabled: true
  },
};
