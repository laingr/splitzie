'use strict';

const response = require('./response');
const models = require('../models');
const messages = require('../messages');
const invite = require('./invite');
const {gt, lte} = models.Sequelize.Op;
const sequelize = models.sequelize;


module.exports = {
  newPool: async (payload) => { //only accessed through actions, channel = 
    await invite.addUser(payload);
    const adminChannel = await getUserChannels(payload);
    await createPool(payload, adminChannel);
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
  },
  adminReview: async () => {
    const review = await getPools();
    for (let i=0; i<review.length; i++){
      const desc = review[i].desc;
      const people = review[i].dataValues.AcceptedInvites;
      const amount = review[i].dataValues.budget*people;
      const adminChannel = review[i].dataValues.adminChannel;
      const uuid = review[i].dataValues.uuid;
      console.log(desc, people, amount, adminChannel, uuid);
      updatePool(1, uuid, 'open', 'false');
      updatePool(1, uuid, 'recapSent', 'true');
      response.sendReview(review[i].dataValues, messages.Recap.sendReview(adminChannel, desc, amount, people));
    }
  }
}

const createPool = async function (payload, adminChannel) {
  const pool = await models.Pool.create( 
    { 
      workplaceId: payload.team.id,
      adminId: payload.user.id,
      adminChannel: adminChannel[1][0].channelId
    })
    // , {include: [models.User]});
    // pool.save();
  }

const findPool = async function (payload) {
  let pool = await models.Pool.findOne({
    raw: true,
    where: {
      adminId: payload.user.id || payload.user,
      open: true
    },
    order: [['createdAt', 'DESC']]
  });
  return pool;
}


const getPools = async () => {
  try {
    let pools = await models.Pool.findAll({
    attributes: [
      'desc',
      'budget',
      'uuid',
      'adminChannel',
      [sequelize.fn('SUM', sequelize.col('Invites.status')),'AcceptedInvites']
    ],
    include: [{
      model: models.Invites,
      attributes: [],
      where: {
        'status': 1
      },
      include: []
    }],
    group: ['Pool.uuid'],
    where: { 
      'closeDate': {[gt]: Date.now()-86400000}, 
      'closeDate': {[lte]: Date.now()},
      'recapSent': false
    },
    options: {
      raw: true,
      returning: true
    }
  });
  return pools;
  }
  catch (err) {
    console.log('not workin', err)
  }
};

const updatePool = async function (payload, uuid, fieldToUpdate, value) {
  const pool = await models.Pool.update( 
    { [fieldToUpdate]: value },
    { where: {uuid: uuid}}
    );
    return 1;
  }

const getUserChannels = async function (payload) {
  const user = await response.getChannels(payload.user.id);
  const userQuery = await models.User.update(
    { channelId: user.channel.id },
    { where: { userId: payload.user.id},
      returning: true,
      raw: true }
  );
  return userQuery;
}
  