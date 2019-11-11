'use strict';

const express = require('express');
const controllers = require('./controllers')
const router = express.Router();

router.post('/slack/action', controllers.actionReceived);
router.get('/admin/', controllers.adminQuery);
router.get('/install/auth', (req, res) => {res.status(301).redirect('https://slack.com/oauth/authorize?client_id=520366147523.822718833478&scope=incoming-webhook,bot,commands')});

module.exports = router;