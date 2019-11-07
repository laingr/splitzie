'use strict';

const dotenv = require('dotenv').config();

const { createEventAdapter } = require('@slack/events-api');
const express = require('express');
const secret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORT || 3000;

const router = require('./router.js');
const db = require('./models');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const slackEvents = createEventAdapter(secret);
const app = express();

app.use('/slack/events', slackEvents.expressMiddleware());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router);

slackEvents.on('message', async (event) => {
  await controllers.messageReceived(event);
});
slackEvents.on('error', console.error);

(async () => {
  await db.sequelize.sync({force:false});
  app.listen(port, () => console.log(`🤩 Listening on port ${port}`))
})();
