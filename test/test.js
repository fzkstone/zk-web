'use strict';

const _ = require('lodash');
const async = require('neo-async');
const config = require('../conf/local');
const request = require('request');

const options = {
  uri: config.test.uri + '/test',
  form: { name: 'テストユーザー' },
  // body: { name: 'テストユーザー' },
  //  headers: {  'Content-Type': 'application/json' },
  headers: {  'aaaa': 'bbbb' },
  json: true
};

request.post(options, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('status', response.statusCode);
  console.log('header', response.headers);
  console.log('body', body);
});


const options2 = {
  uri: config.test.uri + '/test/test_id',
};

request.get(options2, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('status', response.statusCode);
  console.log('header', response.headers);
  console.log('body', body);
});