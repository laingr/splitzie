"use strict";

const cron = require("node-cron");
const moment = require("moment");
const models = require("../models");
const response = require("./response");
const messages = require("../messages");
const pool = require("./pool");
const { gt, lte } = models.Sequelize.Op;

exports.reminders = cron.schedule("*/10 * * * *", async () => {
  const invites = await getInvites();
  for (let i = 0; i < invites.length; i++) {
    const desc = invites[i].desc;
    const amount = invites[i].budget;
    const date = moment(invites[i].closeDate).format("MMM Do");
    const uuid = invites[i].uuid;
    response.sendReminder(
      invites[i].dataValues,
      messages.Reminder.sendReminder(desc, amount, date, uuid)
    );
  }
  console.log("invite cron task every 10 min");
});

exports.complete = cron.schedule("*/20 * * * *", async () => {
  await pool.adminReview();
  console.log("review cron task every 20 min");
});

exports.payment = cron.schedule("*/10 * * * *", async () => {
  const payments = await getPayments();
  console.log(payments);
  for (let i = 0; i < payments.length; i++) {
    const desc = payments[i].desc;
    const amount = payments[i].budget;
    const date = moment(payments[i].closeDate).format("MMM Do");
    const uuid = payments[i].uuid;
    response.sendReminder(
      payments[i].dataValues,
      messages.Pay.payReminder(desc, amount, date, uuid)
    );
  }
  console.log("payment cron task every 10 min");
});

const getInvites = () =>
  models.Invites.findAll({
    where: {
      closeDate: { [gt]: Date.now() },
      closeDate: { [lte]: Date.now() + 86400000 },
      status: null,
      reminderSent: false
    },
    options: {
      raw: true,
      returning: true
    }
  });

  const getPayments = () =>
  models.Invites.findAll({
    where: {
      closeDate: { [gt]: Date.now() - 86400000},
      closeDate: { [lte]: Date.now() + 86400000 },
      status: true,
      paid: false
    },
    options: {
      raw: true,
      returning: true
    }
  });
