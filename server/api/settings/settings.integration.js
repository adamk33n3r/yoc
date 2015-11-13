'use strict';

var app = require('../../app');
var request = require('supertest');

var newSettings;

describe('Settings API:', function() {

  describe('GET /api/settings', function() {
    var settingss;

    beforeEach(function(done) {
      request(app)
        .get('/api/settings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          settingss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      settingss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/settings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/settings')
        .send({
          name: 'New Settings',
          info: 'This is the brand new settings!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSettings = res.body;
          done();
        });
    });

    it('should respond with the newly created settings', function() {
      newSettings.name.should.equal('New Settings');
      newSettings.info.should.equal('This is the brand new settings!!!');
    });

  });

  describe('GET /api/settings/:id', function() {
    var settings;

    beforeEach(function(done) {
      request(app)
        .get('/api/settings/' + newSettings._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          settings = res.body;
          done();
        });
    });

    afterEach(function() {
      settings = {};
    });

    it('should respond with the requested settings', function() {
      settings.name.should.equal('New Settings');
      settings.info.should.equal('This is the brand new settings!!!');
    });

  });

  describe('PUT /api/settings/:id', function() {
    var updatedSettings

    beforeEach(function(done) {
      request(app)
        .put('/api/settings/' + newSettings._id)
        .send({
          name: 'Updated Settings',
          info: 'This is the updated settings!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSettings = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSettings = {};
    });

    it('should respond with the updated settings', function() {
      updatedSettings.name.should.equal('Updated Settings');
      updatedSettings.info.should.equal('This is the updated settings!!!');
    });

  });

  describe('DELETE /api/settings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/settings/' + newSettings._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when settings does not exist', function(done) {
      request(app)
        .delete('/api/settings/' + newSettings._id)
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
