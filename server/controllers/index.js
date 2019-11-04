'use strict';

// exports.createPool() = require('./createPool.js')

const models = require('../models');

// for React UI, pull users pools
// exports.getPools = async function (ctx, next) {
//   const pools = await models.Pool.findAll({
//     include: [{
//       model: models.User
//     }]
//   });
//   ctx.body = pools;
// };

exports.createPool = async function (ctx, next) {
  const pool = await models.Pool.build( 
    { workplaceId: ctx.request.body.workplaceId,
      adminId: ctx.request.body.adminId,
      open: true,
      numInvited: ctx.request.body.numInvited,
      numAccepted: 0,
      numDeclined: 0,
      budget: ctx.request.body.budget,
      desc: ctx.request.body.desc,
      closeDate: ctx.request.body.closeDate
    }
  );
  pool.save();
  ctx.status = 201;
  ctx.body = 'New pool created successfully!';
  console.log(ctx.status);
};

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

