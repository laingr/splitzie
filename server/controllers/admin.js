'use strict';

const models = require('../models');
const sequelize = models.sequelize;

module.exports = {
  getUserData: async (user) => {
    const userInfo = await findUser(user);
    return userInfo;
  },
  getPoolData: async (user) => {
    const userInfo = await findPools(user);
    return userInfo;
  },
  getInviteData: async (user) => {
    const userInfo = await findInvites(user);
    return userInfo;
  }
}

const findPools = async function (user) {
  try {
    let pools = await models.Pool.findAll({
    attributes: [
      'desc',
      'budget',
      'uuid',
      'adminChannel',
      'closeDate',
      [sequelize.fn('SUM', sequelize.col('Invites.status')),'AcceptedInvites']
    ],
    include: [{
      model: models.Invites,
      attributes: [],
      include: []
    }],
    group: ['Pool.uuid'],
    order: [['createdAt', 'desc']],
    where: { 
      'adminId': user 
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

const findUser = async function (user) {
    const userInfo = await models.User.findOne({
      where: {
        userId: user
      }
    });
  return userInfo.dataValues;
};

const findInvites = async function (user) {
  const invite = await models.Invites.findAll(
    { where: { recipient: user},
      returning: true,
      raw: true }
  );
  return invite
}
