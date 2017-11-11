const express = require('express');
const router = express.Router();
//const db = require('../db/init.js');
const auth = require('../lib/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');


router.get('/', (req, res) => {
    //let token = req.headers['x-access-token'];

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    let sessionKey = jwt.decode(token).sessionKey;
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
            res.status(response.statusCode).send()
        }
    })

});
/*
router.get('/', auth.mustBeLoggedIn, (req, res) => {
    db.query('SELECT * FROM USERS', (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    db.query('SELECT * FROM USERS WHERE id = $1', [id], (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

router.get('/:id/registered_subjects', (req, res) => {
    let id = req.params.id;

    db.query('SELECT * FROM USER_REGISTERED_SUBJECT WHERE user_id = $1', [id], (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

router.get('/:id/draft_subjects', (req, res) => {
    let id = req.params.id;

    db.query('SELECT * FROM USER_DRAFT_SUBJECT WHERE user_id = $1', [id], (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});*/

module.exports = router;