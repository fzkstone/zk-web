'use strict';

module.exports = (status, code) => {
  status = status || 500;
  code = code || 'unspecified';
  const e = new Error();
  e.status = status;
  e.code = code;
};