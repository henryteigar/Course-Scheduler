const express = require('express');
const router = express.Router();
const courses = require("../db/DAOs/coursesDAO.js");
const db = require('../db/init.js');

router.get('/', (req, res) => {

    //Input params
    let input_query = req.query.q;
    let input_filter = req.query.filter;
    let statement = courses.getCourses(input_query, input_filter);
    db.query(statement.query_text, statement.parameters, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

module.exports = router;