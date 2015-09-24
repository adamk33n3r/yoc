/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

var thingPromise = Thing.find({}).removeAsync()
  .then(function() {
    return Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, CoffeeScript, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

var userPromise = User.find({}).removeAsync()
  .then(function() {
    return User.createAsync({
      name: {
        first: 'Test',
        last: 'User'
      },
      email: 'test@test.com',
    }, {
      role: 'admin',
      name: {
        first: 'Admin',
        last: 'User'
      },
      email: 'admin@admin.com',
    }, {
      name: {
        first: 'Adam',
        last: 'Keenan'
      },
      facebook: {
        id: '10207313578220466'
      }
    }, {
      name: {
        first: 'Josh',
        last: 'Felker'
      },
      facebook: {
        id: '1181315412'
      }
    }, {
      name: {
        first: 'Geff',
        last: 'Chapel'
      },
      facebook: {
        id: '10155954256795305'
      }
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

var Promise = require('promise');
module.exports = Promise.all([thingPromise, userPromise]);
