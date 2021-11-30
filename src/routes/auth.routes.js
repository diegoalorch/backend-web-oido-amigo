const express = require('express');
const router = express.Router();

const authCtr = require('../controllers/auth.controller');

router.post('/login', authCtr.login);

module.exports =  router;