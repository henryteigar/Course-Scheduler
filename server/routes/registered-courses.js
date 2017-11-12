const express = require('express');
const router = express.Router();
//const db = require('../db/init.js');
//const auth = require('../lib/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');

router.get('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    let sessionKey = jwt.decode(token).sessionKey;
    let options = {
        headers: {
            "session-key": sessionKey
        },
        json: true,
        url: remoteApiUrl + '/registered-courses'
    };

    request.get(options, function (err, response, body) {
        if (err) {
            console.log(err);
            res.status(400).send();
        } else {
            res.status(200).send(body)
        }
    })
});

router.post('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    let sessionKey = jwt.decode(token).sessionKey;
    let options = {
        headers: {
            "session-key": sessionKey
        },
        body: req.body,
        json: true,
        url: remoteApiUrl + '/registered-courses'
    };

    request.post(options, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send();
        } else {
            res.status(200).send()
        }
    })
});

router.delete('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    let sessionKey = jwt.decode(token).sessionKey;
    let options = {
        headers: {
            "session-key": sessionKey
        },
        body: req.body,
        json: true,
        url: remoteApiUrl + '/registered-courses'
    };

    request.delete(options, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send();
        } else {
            res.status(200).send()
        }
    })
});

module.exports = router;