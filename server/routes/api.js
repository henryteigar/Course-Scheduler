const express = require('express');
const router = express.Router();
const users = require('./users.js');
const db = require('../db/init.js')
const courses= require("../db/DAOs/coursesDAO.js");


router.get('/', (req, res) => {
    res.send("This is our API")
});

router.use('/users', users);

/*
TODO
* Tuleb kasutusele võtta mingisugune query builder, et saaks lihtsamini querysid ehitada
* Tuleb backend struktuuti muuta, et ei peaks igas failis sisselogima. Vaatasin, et sisselogimise saab teha automaatseks ENV parameetritega.
* Loogika tuleb eraldada teistesse failidesse. Enpoint failides kasutada väga vähest loogikat.
* Küsimuste korral pöördu Henry poole.
 */
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