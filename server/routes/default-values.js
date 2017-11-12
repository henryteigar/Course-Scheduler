const express = require('express');
const router = express.Router();
//const db = require('../db/init.js');
//const auth = require('../lib/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');



module.exports = router;