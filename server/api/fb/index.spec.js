'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fbCtrlStub = {
  send_notification: 'fbCtrl.send_notification',
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fbIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fb.controller': fbCtrlStub
});

describe('Fb API Router:', function() {

  it('should return an express router instance', function() {
    fbIndex.should.equal(routerStub);
  });

  describe('POST /api/fb', function() {

    it('should route to fb.controller.send_notification', function() {
      routerStub.post
                .withArgs('/', 'fbCtrl.send_notification')
                .should.have.been.calledOnce;
    });

  });
});
