const express = require('express');
const router = express.Router();
const {Pool} = require('pg');
require('dotenv').config();
const users = require('./users.js');


const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING
});

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.use('/users', users);

router.get('/courses', (req, res) => {
    let q = req.query.q;
    let filter = req.query.filter;
    console.log("Filter --> " + filter);
    q = (q === undefined || q === '*') ? "%%" : ((q === '') ? '' : '%' + req.query.q.toLowerCase() + '%');
    let filterStatement = (filter === undefined) ? "" : " AND subject_type LIKE $2";
    let parameters = (filter === undefined) ? [q] : [q].concat("%" + filter + "%");

    pool.query('SELECT *, TO_CHAR(cancellation_date, \'DD.MM.YYYY\') AS cancellation_date FROM subjects WHERE LOWER(title) LIKE $1' + filterStatement, parameters, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

module.exports.router = router;