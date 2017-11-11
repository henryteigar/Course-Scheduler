const express = require('express');
const router = express.Router();
const request = require('request');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let options = {
        method: 'post',
        body: {
            username: username,
            password: password
        },
        json: true,
        url: remoteApiUrl + '/login'
    };

    if (username && password) {
        request.post(options, function (error, response, body) {
            if (response.statusCode === 200) {
                let oisToken = body.token;
                let internalToken = jwt.sign({
                    username: username,
                    sessionKey: oisToken
                }, process.env.JWT_SECRET);
                res.status(200).json({jwt: internalToken});
            } else {
                res.status(response.statusCode).send()
            }
        })
    } else {
        res.status(400).send();
    }
});

module.exports = router;