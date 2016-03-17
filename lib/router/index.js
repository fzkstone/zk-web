'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (router) => {

  fs.readdirSync(__dirname).forEach(function(filename) {
    if (path.extname(filename) === '.js' && filename !== 'index.js') {
      console.log('route: ' + filename);
      require(`./${filename}`)(router);
    }
  });

};
