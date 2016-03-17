'use strict';

const app = require('../server');
const config = require('../conf/local');
const masterLoad = require('../lib/master/load');

masterLoad((err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(config.port);
  console.log('success port:', config.port);
});