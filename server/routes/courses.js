const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');
const mockOis1Converter = require('../lib/mock_ois1_converter');

router.get('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    let sessionKey = jwt.decode(token).sessionKey;
    let options = {
        headers: {
            "session-key": sessionKey
        },
        json: true,
        url: remoteApiUrl + '/courses' + req.url.slice(1)
    };

    request.get(options, function (err, response, body) {
        if (err) {
            res.status(response.statusCode).send()
        }

        let resp = body.map((course_json) => {
            return mockOis1Converter.processCourse(course_json);
        });

        res.status(200).send(resp);

    });
});


module.exports = router;