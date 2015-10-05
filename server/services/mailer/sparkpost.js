process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var path = require('path');
var nodemailer = require('nodemailer');
var sparkpostTransport = require('nodemailer-sparkpost-transport');
var config = require('../../config/environment');


var SparkPostMailer = function (template_id) {
  if (!template_id) {
    throw new Error('You must provide template_id');
  }
  this.transporter = nodemailer.createTransport(sparkpostTransport({
    campaign_id: 'ye-olde-chums',
    sparkPostApiKey: config.sparkpost.api,
    options: {
      open_tracking: true,
      click_tracking: true,
      transactional: false
    }
  }));

  this.recipients = [];
  this.data = {};
  this.template_id = template_id;
};

SparkPostMailer.prototype.addRecipient = function (name, address, data) {
  var recipient = {
    address: {
      name: name,
      email: address
    }
  };

  if (data) {
    recipient.substitution_data = data;
  }

  this.recipients.push(recipient);
};

SparkPostMailer.prototype.setData = function (data) {
  this.data = data;
};

SparkPostMailer.prototype.send = function () {
  ths = this;
  return new Promise(function (fullfill, reject) {
    if (ths.recipients.length === 0) {
      reject(new Error('Must add a recipient'));
    } else {
      ths.transporter.sendMail({
        recipients: ths.recipients,
        substitution_data: ths.data,
        content: {
          template_id: ths.template_id
        }
      }, function(err, info) {
        if (err) {
          reject(err);
        } else {
          fullfill(info);
        }
      });
    }
  });
};

module.exports = SparkPostMailer;
