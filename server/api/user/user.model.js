'use strict';

var mongoose = require('mongoose-bird')();
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: 'user'
  },
  facebook: {},
  settings: {
    notifications: {
      facebook: {
        type: Boolean,
        default: true
      },
      email: {
        type: Boolean,
        default: false
      }
    }
  }
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
  .virtual('name.full')
  .get(function() {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function(val) {
    var split = val.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOneAsync({ email: value })
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    next();
  });

/**
 * Methods
 */
UserSchema.methods = {
};

module.exports = mongoose.model('User', UserSchema);
