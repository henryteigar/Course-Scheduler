const express = require('express');
const router = express.Router();
const { Pool, Client} = require('pg');

const connectionString = 'postgresql://postgres:postgres@207.154.242.61:5432/course-scheduler'
const pool = new Pool({
    connectionString: connectionString,
});

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.get('/subjects', (req, res) => {
    var param = req.query.query;
    var whereQuery = "";
    if (param) {
        whereQuery = " WHERE LOWER(title) LIKE '%" + param +"%'";
    };

    pool.query('SELECT * FROM SUBJECTS' + whereQuery, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

router.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var whereQuery = "";
    if (id) {
        whereQuery = " WHERE id = " + id;
    }

    pool.query('SELECT * FROM USERS' + whereQuery, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

module.exports.router = router;