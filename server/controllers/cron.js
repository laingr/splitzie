'use strict';

const cron = require('node-cron');
const moment = require('moment');
const models = require('../models');
const response = require('./response');
const messages = require('../messages');
const {gt, lte} = models.Sequelize.Op;

exports.reminders = cron.schedule('*/10 * * * *', async () => {
  const invites = await invite;
  for (let i=0; i<invites.length; i++) {
    const desc = invites[i].desc;
    const amount = invites[i].budget;
    const date = moment(invites[i].closeDate).format("MMM Do");
    const uuid = invites[i].uuid;
    response.sendReminder(invites[i].dataValues, messages.Reminder.sendReminder(desc, amount, date, uuid))
  }
  //log reminder
  console.log('cron task every 10 min');
});

exports.complete = cron.schedule('*/10 * * * *', async () => {
  const complete = await complete;
  for (let i=0; i<invites.length; i++) {
    const desc = invites[i].desc;
    const amount = invites[i].budget;
    const date = moment(invites[i].closeDate).format("MMM Do");
    const uuid = invites[i].uuid;
    response.sendReminder(invites[i].dataValues, messages.Reminder.sendReminder(desc, amount, date, uuid))
  }
  //log reminder
  console.log('cron task every 10 min');
});

const invite = models.Invites.findAll({ 
  where: { 
    closeDate: {[gt]: Date.now()}, 
    closeDate: {[lte]: Date.now()+86400000},
    status: null
  },
  options: {
    raw: true,
    returning: true
  }
});

const complete = models.Invites.findAll({ 
  where: { 
    closeDate: {[gt]: Date.now()-86400000}, 
    closeDate: {[lte]: Date.now()},
    status: null
  },
  options: {
    raw: true,
    returning: true
  }
});