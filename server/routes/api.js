const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const users = require('./users.js');

const connectionString = 'postgresql://postgres:postgres@207.154.242.61:5432/course-scheduler';
const pool = new Pool({
    connectionString: connectionString,
});

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.use('/users', users);

router.get('/courses', (req, res) => {
    let q = req.query.q;
    q = (q === undefined) ? "%%" : ((q === '') ? '' : '%' + req.query.q.toLowerCase() + '%');

    pool.query('SELECT *, TO_CHAR(cancellation_date, \'DD-MM-YYYY\') AS cancellation_date FROM SUBJECTS WHERE LOWER(title) LIKE $1', [q], (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.send(result.rows);
    });
});

module.exports.router = router;