'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var env = process.env.NODE_ENV || 'development';
var all = {
  env: env,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: requiredProcessEnv('SESSION_SECRET')
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      },
      user: requiredProcessEnv('MONGO_USER'),
      pass: requiredProcessEnv('MONGO_PASS'),
      auth: {
        authSource: 'admin'
      }
    }
  },

  // SparkPost
  sparkpost: {
    api: requiredProcessEnv('SPARKPOST_TOKEN')
  },

  // Slack
  slack: {
    webhook: requiredProcessEnv('WEBHOOK_URL'),
    clinkToken: requiredProcessEnv('CLINK_TOKEN')
  },

  // Teamspeak
  teamspeak: {
    url: 'localhost',
    username: 'serveradmin',
    password: requiredProcessEnv('TEAMSPEAK_PASS')
  },

  // Minecraft
  minecraft: {
    host: 'mc.adam-keenan.com',
    port: 25565
  },

  // Facebook
  facebook: {
    id: requiredProcessEnv('FACEBOOK_ID'),
    secret: requiredProcessEnv('FACEBOOK_SECRET')
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + env + '.js') || {});
