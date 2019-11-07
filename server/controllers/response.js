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
  newPool:() => {
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
      channel: payload.channel
    });
  },
  askDate: async (payload, text) => {
    await web.chat.postMessage({
      text: text,
      channel: payload.channel_id || payload.channel
    });
  },
  confirmPool: async (payload, text) => {
    await web.chat.postMessage({
      text: text,
      channel: payload.channel_id || payload.channel
    });
  },
  invite:() => {
    
  },
}