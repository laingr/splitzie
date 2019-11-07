'use strict';

const express = require('express');
const controllers = require('./controllers')
const router = express.Router();

router.post('/slack/action', controllers.actionReceived);

module.exports = router;