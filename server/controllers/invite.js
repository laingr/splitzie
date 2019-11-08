'use strict';

const response = require('./response');
const models = require('../models');
const messages = require('../messages');
const pool =  require('./pool');
const moment = require('moment');

module.exports = {
  inviteToPool: async (event, last) => {
    const pool = await findPool(event);
    const invites = inviteParse(event.text);
    await addUsers(event, invites);
    await addToPool(pool, invites);
    const userData = await getInviteChannels(event, invites);
    await inviteNewUsers(pool, userData);
    response.text(event, messages.Invite.confirmInvitesSent);
  },
  addUser: async (event) => {
    addUsers(event, event.user);
  },
  actionInvite: async (inviteUuid, status) => {
    updateInvite(inviteUuid, status);
    //updateDB
    //send resp
    //send admin
  },
  declineInvite: async () => {

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

const inviteParse = function (text) {
  const users = text.split(' ');
  const userSplit = users.map(i=>i.slice(2,i.length-1));
  return userSplit;
}

const addUsers = async function (event, users) {
  for (let i=0;i<users.length;i++){
    await models.User.findOrCreate(
    {
      userId: users[i],
      workplaceId: event.team.id,
      // channelId: DataTypes.STRING,
      poolsInvited: [],
      poolsAccepted: [],
      poolsCompleted: [],
      where: { userId: users[i]}
    });
  return 'users added';
  }};

const addToPool = async function (pool, invites) {
  const alreadyInvited = pool.invited;
  invites.forEach(i=>alreadyInvited.push(i));
  await models.Pool.update(
    { invited: alreadyInvited },
    { where: {uuid: pool.uuid}}
  )
  return alreadyInvited;
}


const getInviteChannels = async function (event, invites) {
  const userData = [];
  for (let i=0; i<invites.length; i++) {
    const user = await response.getChannels(invites[i]);
    const userQuery = await models.User.update(
      { channelId: user.channel.id },
      { where: { userId: invites[i]},
        returning: true,
        raw: true }
    );
    userData.push(userQuery[1][0]);
  }
  return userData;
}

const inviteNewUsers = async function (pool, userData) {
  const desc = pool.desc;
  const amount = pool.budget;
  const date = moment(pool.closeDate).format("MMM Do");
  for (let i=0;i<userData.length;i++){
    const uuid = await models.Invites.create(
      {
        PoolUuid: pool.uuid,
        recipient: userData[i].uuid,
      }, {returning: true,
        raw: true}
        );
    let inviteString = messages.Invite.sendInvite(desc, amount, date, uuid.uuid);
    await response.sendInvite(userData[i],pool,inviteString)
  };
  return userData;
};

const updateInvite = async function (uuid, status) {
  const invite = await models.Invites.update(
    { status: status },
    { where: { uuid: uuid},
      returning: true,
      raw: true }
  );
  return invite.uuid
}