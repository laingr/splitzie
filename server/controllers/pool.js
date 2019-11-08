'use strict';

const response = require('./response');
const models = require('../models');
const messages = require('../messages')

module.exports = {
  newPool: async (payload) => { //only accessed through actions, channel = 
    await createPool(payload);
    response.askDesc(payload, messages.Onboard.askDesc);
  },
  askBudget: async (payload, last) => {
    const pool = await findPool(payload);
    const fieldToUpdate = 'desc';
    const desc = payload.text;
    await updatePool(payload, pool.uuid, fieldToUpdate, desc); //upload description data
    response.askBudget(payload, messages.Onboard.askBudget);
  },
  askDate:async (payload, last) => {
    const pool = await findPool(payload);    
    const fieldToUpdate = 'budget';
    const budget = payload.text;
    await updatePool(payload, pool.uuid, fieldToUpdate, budget); //upload budget data
    response.askDate(payload, messages.Onboard.askDate);
  },
  confirm:async (payload, dateInfo) => {
    const pool = await findPool(payload);
    pool.closeDate = dateInfo.selected_date; //updating here for confirm message without going back to db
    const fieldToUpdate = 'closeDate';
    const date = new Date(dateInfo.selected_date);
    updatePool(payload, pool.uuid, fieldToUpdate, date); //upload date data
    await response.confirmPool(payload, pool, messages.Onboard.confirm);
    response.text(payload, messages.Onboard.invite); //opens invite flow
  }
}

const createPool = async function (payload) {
  const pool = await models.Pool.build( 
    { workplaceId: payload.team.id,
      adminId: payload.user.id
    });
    pool.save();
  }

const findPool = async function (payload) {
  let pool = await models.Pool.findOne({
    raw: true,
    where: {
      adminId: payload.user.id || payload.user
    },
    order: [['createdAt', 'DESC']]
  });
  return pool;
}

const updatePool = async function (payload, uuid, fieldToUpdate, value) {
  const pool = await models.Pool.update( 
    { [fieldToUpdate]: value },
    { where: {uuid: uuid}}
    )
  }