const express = require('express');
const router = express.Router();
const users = require('./users.js');
const db = require('../db/init.js')
const courses= require("../db/DAOs/coursesDAO.js");
const request = require('request');


router.get('/', (req, res) => {
    res.send("This is our API")
});

router.get('/login/:username&:password', (req, res) => {
    let name = req.params.username;
    let pass = req.params.password;

    if (!name) {
        res.status(400).send('Username required');
        return;
    }
    if (!pass) {
        res.status(400).send('Password required');
        return;
    }
    let a = 'http://localhost:3001/api/login/' + name + '&' + pass

    console.log(a);
    request(a, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', JSON.parse(body));
        var info  = JSON.parse(body);
        console.log(info.token);
        res.send(body);

    })

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