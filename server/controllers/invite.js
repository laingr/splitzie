'use strict';

const response = require('./response');
const models = require('../models');
const messages = require('../messages');
const pool =  require('./pool');

module.exports = {
  inviteToPool: async (event, last) => {
    const pool = await findPool(event);
    inviteParse(event.text);
    //parse message
    //push users to pool
    //send user message
    // await createPool(payload);
    // response.askDesc(payload, messages.Onboard.askDesc);
  }
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

  const inviteParse = function (text) {
    const users = text.split(' ');
    console.log(users);
    return users;
  }