'use strict';

var app = require('../../app');
var request = require('supertest');

var newFb;

describe('Fb API:', function() {

  describe('POST /api/fb', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fb')
        .send({
          user_id: '00000000000000000',
          message: 'This is a test notification!!!'
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
      newFb.success.should.equal(true);
    });

  });
});
