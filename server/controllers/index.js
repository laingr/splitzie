'use strict';

const moment = require('moment');
const pool = require('./pool');
const invite = require('./invite');
const pay = require('./pay');
const response = require('./response');
const models = require('../models');
const messages = require('../messages');
const admin = require('./admin');
const cron = require('./cron');

// cron.reminders.start();

exports.adminQuery = async (req, res) => {
  let user = req.query.user;
  const userInfo = await admin.getUserData(user);
  const pools = await admin.getPoolData(user);
  const invites = await admin.getInviteData(userInfo.uuid);
  user = {
    info:userInfo,	
    pools:pools,
    invites:invites
    };
  res.status(200);
  res.send(JSON.stringify(user));
}

//message events receiver
exports.messageReceived = async (event) => {
  if (!event.username) { //if not a bot
    let last = await lastLog(event); //get message they're responding to
    if (!last || event.text === 'hi') await response.welcome(event); //welcome flow
    if (last.text === messages.Onboard.invite || event.text[0] === '<') invite.inviteToPool(event,last); //invite flow
    ((Date.now() - last.ts) > 50000)?last.expired = true:last.expired = false; //determine expired time
    if (!last.expired && !event.username){ //create flow
      console.log(event);
      if(last.text === messages.Onboard.askDesc) pool.askBudget(event, last);
      else if(last.text === messages.Onboard.askBudget) pool.askDate(event, last);
      else if(last.text === messages.Onboard.askDate) pool.confirm(event, last);
      // else response.text(event, messages.General.startOver)
    }
    // else if (last.expired && !event.username) response.text(event, messages.General.startOver);
    else response.text(event, messages.General.unknown);
  } else {
    const botLast = {channel: 'user', text: 'something'};
    log(event, botLast || last);
}};

//action events receiver
exports.actionReceived = async (req,res) => {
  let payload = JSON.parse(req.body.payload);
  res.status(200);
  res.send();
  payload.channel_id = payload.channel.id;
  if (payload.callback_id === 'create_new') { //non-block action create_new
    await response.text(payload, messages.General.newPool);
    pool.newPool(payload);
  };
  if (payload.callback_id === 'say_hi') response.text(payload, messages.General.hi); //non-block action say_hi
  if (payload.actions) { //used for all block actions
    let action = payload.actions;
    if (action[0].type === 'datepicker') {
      pool.confirm(payload, action[0]);
    } else if (action[0].value === 'new_pool') {
      const res = await response.text(payload, messages.General.newPool);
      pool.newPool(payload);
    } else if (action[0].text.text === `I'm In!`) {
      invite.actionInvite(payload, action[0].value, 1);
    } else if (action[0].text.text === 'No thanks.') {
      invite.actionInvite(payload, action[0].value, 0);
    } else if (action[0].text.text === 'Yup!') {
      pay.actionPay(payload, action[0].value, 1);
    } else if (action[0].text.text === 'Ok') {
      console.log('ok')// invite.actionDash(payload, action[0].value);
    } else response.text(payload, messages.General.unknown);
  }
};

//message logger to db
const log = async function (event, last) {
  const log = await models.Log.build( 
    { type: event.type,
      subtype: event.subtype || 'user',
      text: event.text,
      ts: moment.unix(event.ts).format('YYYY-MM-DDTHH:mm:ss'),
      username: event.user,
      bot_id: event.bot_id,
      channel: event.channel,
      event_ts: moment.unix(event.ts).format('YYYY-MM-DDTHH:mm:ss'),
      channel_type: event.channel_type,
      in_reply_to: last.channel,
      in_reply_text: last.text
    });
    log.save();
}

const lastLog = function(event) {
  return  models.Log.findOne({
    raw: true,
    where: {
      channel: event.channel
    },
    order: [['createdAt', 'DESC']]
  })
};
