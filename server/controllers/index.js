'use strict';

const moment = require('moment');
const pool = require('./pool');
const response = require('./response');
const models = require('../models');
const messages = require('../messages');

exports.download = async (event) => {
  await response.welcome(event);
//install new user?  log(event);
};

exports.messageReceived = async (event) => {
  if (!event.username) {
    let last = await models.Log.findOne({
    raw: true,
    where: {
      channel: event.channel
    },
    order: [['createdAt', 'DESC']]
  });
  if (!last) last = await log(event,event);
  if (last.text === messages.Onboard.askDesc) pool.askBudget(event, last);
  if (last.text === messages.Onboard.askBudget) pool.askDate(event, last);
  if (last.text === messages.Onboard.askDate) pool.confirm(event, last);
  if (!last || event.text === 'hi') await response.welcome(event);
}
const botLast = {
  channel: 'user',
  text: 'something'
}
  log(event, botLast);

};

exports.actionReceived = async (req,res) => {
  let payload = JSON.parse(req.body.payload);
  res.status(200);
  res.send();
  payload.channel_id = payload.channel.id;
  if (payload.callback_id === 'opt_in') {
    const resp = await response.text(payload, messages.General.newPool);
    pool.newPool(payload);
  };
  if (payload.callback_id === 'opt_out') response.text(payload, messages.General.dismiss);
  if (payload.actions) {
    let action = payload.actions;
    if (action[0].value === 'new_pool') {
      await response.text(payload, messages.General.newPool);
      pool.newPool(payload);
    }  else response.text(payload, messages.General.unknown);
  }
};

exports.timedMessage = () => {

};

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

// exports.createUser = async function (ctx, next) {
//   const user = await models.User.build(
//     {authorName: ctx.request.body.authorName, authorId: false}
//   );
//   user.save();
//   ctx.status = 201;
// };

// exports.getUser = async function (ctx, next) {
//   const user = await models.User.findAll();
//   ctx.body = user;
// };

