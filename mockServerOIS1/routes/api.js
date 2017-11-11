const express = require('express');
const router = express.Router();
const db = require('../db/init.js');


router.get('/', (req, res) => {
    res.send("This is test server API")
});

router.get('/user', (reg, res) => {
    let sessionKey = reg.headers['session-key'];
    db.query('SELECT * from ois1.v_users where id = $1', [sessionKey], (err, result) => {

        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });

});


router.post('/login', (req, res) => {
    let username = req.body.username;

    db.query('SELECT id from ois1.users where username = $1', username, (err, result) => {
        if (err) {
            res.status(404).send();
        }
        res.status(200).send(result.rows);
    });
});

module.exports.router = router;