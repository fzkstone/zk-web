'use strict';

const _ = require('lodash');
const async = require('neo-async');
const service = require('../service');

module.exports = (router) => {
  //検索系
  router.route('/test')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const data = req.query;
    service.test.listBook(data, (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(result);
    });
  }).put((req, res, next) => {
    //incretest
    const data = req.body.data;
    service.test.addIncretest(data, (err, result) => {
      if (err) {
        return next(err);
      }
      const insertId = result.insertId;
      res.status(200).json({ id: insertId });
    });
  });

  //通常系
  router.route('/test/:id')
  .all((req, res, next) => {
    res.set('Content-Type', 'application/json');
    return next();
  })
  .get((req, res, next) => {
    const bookId = req.params.id;
    service.test.getBook(bookId, (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(result);
    });
  })
  .post((req, res, next) => {
    const bookId = req.params.id;
    const data = req.body.data;
    service.test.updateBook(bookId, data, (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.affectedRows) {
        res.status(302).redirect(`/test/${bookId}`);
      } else {
        res.status(204).end();
      }
    });
  })
  .put((req, res, next) => {
    const bookId = req.params.id;
    const data = req.body.data;
    service.test.addBook(bookId, data, (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.affectedRows) {
        res.status(201).end();
      } else {
        res.status(204).end();
      }
    });
  })
  .delete((req, res, next) => {
    const bookId = req.params.id;
    service.test.deleteBook(bookId, (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.affectedRows) {
        res.status(202).end();
      } else {
        res.status(204).end();
      }
    });
  });
};