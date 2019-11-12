'use strict';

const { WebClient } = require('@slack/web-api');
const token = process.env.BOT_TOKEN;
const web = new WebClient(token);
const messages = require('../messages');

module.exports = {
  welcome: async (event) => {
    if (!event.subtype) {
      await web.chat.postMessage({
        blocks: messages.Onboard.Welcome,
        channel: event.channel_id || event.channel
      });
    }
  },
  unknown: async (event) => {
    event.text = messages.General.unknown,
    await web.chat.postMessage({
      text: event.text,
      channel: event.channel_id || event.channel
    });
  },
  text: (event, text) => {
    return web.chat.postMessage({
      text: text || event.text,
      channel: event.channel_id || event.channel
    });
  },
  askDesc: async (payload, text) => {
    const resp = await web.chat.postMessage({
      text: text,
      channel: payload.channel_id || payload.channel
    });
  },
  askBudget: async (payload, text) => {
    await web.chat.postMessage({
      text: text,
      channel: payload.channel_id || payload.channel
    });
  },
  askDate: async (payload, text) => {
    await web.chat.postMessage({
      blocks: text,
      channel: payload.channel_id || payload.channel
    });
  },
  confirmPool: (payload, pool, text) => {
    return web.chat.postMessage({
      text: `${text} Splitzie for ${pool.desc} with budget $${pool.budget} due on ${pool.closeDate}`,
      channel: payload.channel_id || payload.channel
    });
  },
  getChannels: (user) => {
    return web.im.open({
      user: user
    })
  },
  sendInvite: (invited, pool, text) => {
    return web.chat.postMessage({
      blocks: text,
      channel: invited.channelId
    });
  },
  sendReminder: (invited, text) => {
    return web.chat.postMessage({
      blocks: text,
      channel: invited.channelId
    });
  },
  sendReminder: (invited, text) => {
    return web.chat.postMessage({
      blocks: text,
      channel: invited.channelId
    });
  },
  sendDashboard: (invited, text) => {
    return web.chat.postMessage({
      blocks: text,
      channel: invited.channel
    });
  },
  sendReview: (accepted, text) => {
    return web.chat.postMessage({
      blocks: text,
      channel: accepted.adminChannel
    });
  }
}