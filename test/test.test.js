/* global  it, describe */
'use strict';

require('./mock');
const _ = require('lodash');
const async = require('neo-async');
const config = require('../conf/local');
const request = require('supertest');
const expect = require('expect.js');
const app = require('../server');
const master = require('../lib/master/data');

describe('master', () => {
  it('master test', (done) => {
    expect(master.book[1].title === 'title01');
    done();
  });
});

describe('GET /test', () => {
  it('should get book list', (done) => {
    request(app)
    .get('/test?title=1&category_id=1')
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.length === 2);
      return done();
    });
  });
});

describe('PUT /test', () => {
  it('should add incretest', (done) => {
    request(app)
    .put('/test')
    .set('Accept', 'application/json')
    .send({ data: { name: 'incre_name1', detail: 'incre_detail1' } })
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.id > 1).to.be.eql(true);
      return done();
    });
  });
});

describe('GET /test/:id', () => {
  it('should get book', (done) => {
    request(app)
    .get('/test/1')
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.id).to.eql(1);
      expect(res.body.title).to.eql('title01');
      return done();
    });
  });

  it('return 404', (done) => {
    request(app)
    .get('/test/999')
    .expect(404)
    .end(done);
  });
});

describe('POST /test/:id', () => {
  it('should update book', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .post('/test/2')
        .set('Accept', 'application/json')
        .send({ data: { title: 'update_title02' } })
        .expect(302)
        .end((err, res) => {
          if (err) {
            return next(err);
          }
          expect(res.header.location).to.eql('/test/2');
          return next();
        });
      },
      (next) => {
        request(app)
        .get('/test/2')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return next(err);
          }
          expect(res.body.id).to.eql(2);
          expect(res.body.title).to.eql('update_title02');
          return next();
        });
      }
    ], done);
  });

  it('return 204', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .post('/test/100')
        .set('Accept', 'application/json')
        .send({ data: { title: 'update_title02' } })
        .expect(204)
        .end(next);
      },
    ], done);
  });

});

describe('PUT /test/:id', () => {
  it('should add book', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .put('/test/11')
        .set('Accept', 'application/json')
        .send({ data: { title: 'add_title11' } })
        .expect(201)
        .end(next);
      },
      (next) => {
        request(app)
        .get('/test/11')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return next(err);
          }
          expect(res.body.id).to.eql(11);
          expect(res.body.title).to.eql('add_title11');
          return next();
        });
      }
    ], done);
  });

  it('return 204', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .put('/test/1')
        .set('Accept', 'application/json')
        .send({ data: { title: 'update_title02' } })
        .expect(204)
        .end(next);
      },
    ], done);
  });

});

describe('DELETE /test/:id', () => {
  it('should delete book', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .delete('/test/3')
        .expect(202)
        .end(next);
      },
    ], done);
  });

  it('return 204', (done) => {
    async.angelFall([
      (next) => {
        request(app)
        .delete('/test/100')
        .expect(204)
        .end(next);
      },
    ], done);
  });

});