'use strict';

const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).forEach(function(filename) {
  if (path.extname(filename) === '.js' && filename !== 'index.js') {
    let jsname = path.basename(filename, '.js');
    exports[jsname] = require(`./${filename}`);
  } else if (fs.statSync(path.join(__dirname, filename)).isDirectory()) {
    exports[filename] = require(`./${filename}`);
  }
});
