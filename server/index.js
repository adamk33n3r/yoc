'use strict';

var localConfig = require('./config/local.env');

for (var key in localConfig) {
  process.env[key] = localConfig[key];
}

// Export the application
exports = module.exports = require('./app');
