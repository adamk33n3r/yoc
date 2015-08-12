'use strict';

var app = require('../../app');
var request = require('supertest');

var newFb;

describe('Fb API:', function() {

  describe('GET /api/fb', function() {
    var fbs;

    beforeEach(function(done) {
      request(app)
        .get('/api/fb')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          fbs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      fbs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/fb', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fb')
        .send({
          name: 'New Fb',
          info: 'This is the brand new fb!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFb = res.body;
          done();
        });
    });

    it('should respond with the newly created fb', function() {
      newFb.name.should.equal('New Fb');
      newFb.info.should.equal('This is the brand new fb!!!');
    });

  });

  describe('GET /api/fb/:id', function() {
    var fb;

    beforeEach(function(done) {
      request(app)
        .get('/api/fb/' + newFb._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          fb = res.body;
          done();
        });
    });

    afterEach(function() {
      fb = {};
    });

    it('should respond with the requested fb', function() {
      fb.name.should.equal('New Fb');
      fb.info.should.equal('This is the brand new fb!!!');
    });

  });

  describe('PUT /api/fb/:id', function() {
    var updatedFb

    beforeEach(function(done) {
      request(app)
        .put('/api/fb/' + newFb._id)
        .send({
          name: 'Updated Fb',
          info: 'This is the updated fb!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFb = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFb = {};
    });

    it('should respond with the updated fb', function() {
      updatedFb.name.should.equal('Updated Fb');
      updatedFb.info.should.equal('This is the updated fb!!!');
    });

  });

  describe('DELETE /api/fb/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/fb/' + newFb._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fb does not exist', function(done) {
      request(app)
        .delete('/api/fb/' + newFb._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
