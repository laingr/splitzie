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
    const fieldToUpdate = 'desc';
    const desc = payload.text;
    await updatePool(payload, fieldToUpdate, desc); //upload description data
    response.askBudget(payload, messages.Onboard.askBudget);
  },
  askDate:async (payload, last) => {
    const fieldToUpdate = 'budget';
    const budget = payload.text;
    console.log('updating budget');
    await updatePool(payload, fieldToUpdate, budget); //upload budget data
    console.log('responsding');
    response.askDate(payload, messages.Onboard.askDate);
  },
  confirm:(payload, last) => {
    const fieldToUpdate = 'closeDate';
    const date = new Date(Date.now()+1000000);
    updatePool(payload, fieldToUpdate, date); //upload date data
    response.confirmPool(payload, messages.Onboard.confirm);
  }
}

const createPool = async function (payload) {
  const pool = await models.Pool.build( 
    { workplaceId: payload.team.id,
      adminId: payload.user.id
    });
    pool.save();
  }

const updatePool = async function (payload, fieldToUpdate, value) {
  const pool = await models.Pool.update( 
    { [fieldToUpdate]: value },
    { where: {uuid: 'ea57ced0-0186-11ea-b535-6190adbc99a7'}}
    )
  }