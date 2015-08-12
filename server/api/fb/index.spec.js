'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fbCtrlStub = {
  index: 'fbCtrl.index',
  show: 'fbCtrl.show',
  create: 'fbCtrl.create',
  update: 'fbCtrl.update',
  destroy: 'fbCtrl.destroy'
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

  describe('GET /api/fb', function() {

    it('should route to fb.controller.index', function() {
      routerStub.get
                .withArgs('/', 'fbCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/fb/:id', function() {

    it('should route to fb.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'fbCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/fb', function() {

    it('should route to fb.controller.create', function() {
      routerStub.post
                .withArgs('/', 'fbCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/fb/:id', function() {

    it('should route to fb.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'fbCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/fb/:id', function() {

    it('should route to fb.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'fbCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/fb/:id', function() {

    it('should route to fb.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'fbCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
