const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');
const mockOis1Converter = require('../lib/mock_ois1_converter');

router.get('/', (req, res) => {

    let token = req.headers['x-access-token'];
    try {
        let sessionKey = jwt.decode(token).session_key;
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
            else {
                if (body) {

                    let resp = body.map((course_json) => {
                        return mockOis1Converter.processCourse(course_json);
                    });

                    res.status(200).send(resp);
                }
                else {
                    res.status(500).send();
                }
            }
        });
    }
    catch (e) {
        res.status(400).send();
    }
});


module.exports = router;