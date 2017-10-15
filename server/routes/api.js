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

router.get('/subjects', (req, res) => {
    let q = req.query.q;
    q = q != undefined ?  req.query.q.toLowerCase() : "";
    q = '%' + q + '%';

    pool.query('SELECT * FROM SUBJECTS WHERE LOWER(title) LIKE $1', [q], (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

module.exports.router = router;