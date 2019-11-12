'use strict';

const response = require('./response');
const models = require('../models');
const messages = require('../messages');
const pool =  require('./pool');
const moment = require('moment');

module.exports = {
  actionPay: (payload, payUuid) => {
    console.log(payload, payUuid);
    updatePay(payUuid);
    response.text(payload, messages.Pay.confirmPay);
  }
};

const updatePay = function (uuid) {
  models.Invites.update(
    { paid: 1 },
    { where: { uuid: uuid},
      returning: true,
      raw: true }
  )
}