const express = require('express');
const router = express.Router();
//const db = require('../db/init.js');
//const auth = require('../lib/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');


router.get('/', (req, res) => {
    let token = req.headers['x-access-token'];
    try {
        let sessionKey = jwt.decode(token).session_key;
        let options = {
            method: 'get',
            headers: {
                "session-key": sessionKey
            },
            json: true,
            url: remoteApiUrl + '/user'
        };
        request.get(options, function (error, response, body) {
            if (response.statusCode === 200) {
                res.status(200).send(body);
            } else {
                res.status(400).send()
            }
        })
    } catch(e) {
        res.status(400).send();
    }
});

module.exports = router;