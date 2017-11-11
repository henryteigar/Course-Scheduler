const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
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
        url: remoteApiUrl + '/courses' + req.url.slice(1)
    };
    request.get(options, function (error, response, body) {
        if (response.statusCode === 200) {
            let resp = body.map((json) => {return {
                id: json.id,
                course_name_est: json.name_est,
                course_name_eng: json.name_eng,
                credits: json.credits,
                reg_persons: json.registered_attendants + "/" + json.limit_of_attendants,
                cancellation_date: json.cancellation_date.slice(0,10).split("-").reverse().join('.'),
                lecturer: json.lecturers.responsible[0].name,
                schedule_est: json.occurrences.map((occ) => {return (occ.time.map((time) => {return time.day}))}).join()
                    .split(",").filter((item, pos, self) => {return self.indexOf(item) === pos}).sort()
                    .map((el) => {return ['E', 'T', 'K', 'N', 'R', 'L', 'P'][['1', '2', '3', '4', '5', '6', '7'].indexOf(el)]})
                    .join(","),
                schedule_eng: json.occurrences.map((occ) => {return (occ.time.map((time) => {return time.day}))}).join()
                    .split(",").filter((item, pos, self) => {return self.indexOf(item) === pos}).sort()
                    .map((el) => {return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][['1', '2', '3', '4', '5', '6', '7'].indexOf(el)]})
                    .join(",")
            }});

            res.status(200).send(resp);
        } else {
            res.status(response.statusCode).send()
        }
    });
});


module.exports = router;