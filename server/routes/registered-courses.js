const express = require('express');
const router = express.Router();
//const db = require('../db/init.js');
//const auth = require('../lib/auth.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];
const request = require('request');
const mockOis1Converter = require('../lib/mock_ois1_converter');

router.get('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
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
                res.status(500).send();
            } else {
                let resp = body.map((registered_course_json) => {
                    registered_course_json.course = mockOis1Converter.processCourse(registered_course_json.course);
                    return registered_course_json;
                });
                res.status(200).send(resp)
            }
        })
    }
    catch (e){
        res.status(400).send();
    }
});

router.post('/', (req, res) => {

    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;

        let course_id = req.body.course_id;
        let group_id = req.body.group_id;

        let options = {
            headers: {
                "session-key": sessionKey
            },
            body: {
                course_id: course_id,
                group_id: group_id
            },
            json: true,
            url: remoteApiUrl + '/registered-courses'
        };

        request.post(options, function (err, response) {
            if (err) {
                res.status(500).send();
            } else {
                res.status(response.statusCode).send()
            }
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.delete('/:course_id', (req, res) => {
    //let token = req.headers['x-access-token'];
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;

        let options = {
            headers: {
                "session-key": sessionKey
            },
            body: {
                'course_id': req.params.course_id
            },
            json: true,
            url: remoteApiUrl + '/registered-courses'
        };

        request.delete(options, function (err, response) {
            if (err) {
                res.status(500).send();
            } else {
                res.status(response.statusCode).send()
            }
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

module.exports = router;