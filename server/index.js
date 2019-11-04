'use strict';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');
const db = require('./models');

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());

(async () => {
  await db.sequelize.sync({force:true});
  app.listen(4000, (res=>{
    console.log('Listening on port 4000');
  }))
})();