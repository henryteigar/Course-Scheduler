const express = require('express');
const router = express.Router();
const users = require('./users.js');
const db = require('../db/init.js');
const courses= require("../db/DAOs/coursesDAO.js");
const request = require('request');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const remoteApiUrl = process.env[process.env.REMOTE_SERVER];

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.post('/login', (req, res) => {
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
            if (response.statusCode == 200) {
                let oisToken = body.token;
                let internalToken = jwt.sign({
                    username: username,
                    sessionKey: oisToken}, process.env.JWT_SECRET);
                res.status(200).json({jwt: internalToken});
            } else {
                res.status(response.statusCode).send()
            }
        })
    } else {
        res.status(400).send();
    }
});

router.use('/users', users);

router.get('/courses', (req, res) => {

    //Input params
    let input_query = req.query.q;
    let input_filter = req.query.filter;
    var statement = courses.getCourses(input_query, input_filter);
    db.query(statement.query_text, statement.parameters, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });


});

module.exports.router = router;