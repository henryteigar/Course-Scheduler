const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/init.js');
const mockOis1Converter = require('../lib/mock_ois1_converter');

router.get('/', (req, res) => {
    //let token = req.headers['x-access-token'];

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;
        db.query('SELECT * FROM v_drafts WHERE user_id = $1', [sessionKey], (err, result) => {
            if (err) {
                res.status(500).send();
            }
            else {
                result.rows.map((row) => {
                    row.course = mockOis1Converter.processCourse(row.course);
                });
                res.status(200).send(result.rows);
            }
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.post('/:course_id', (req, res) => {
    //let token = req.headers['x-access-token'];

    let course_id = req.params.course_id;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;
        db.query('INSERT INTO draft_courses (user_id, course_id, active_group_id)' +
            'SELECT $1, $2, NULL WHERE NOT EXISTS (SELECT * FROM draft_courses WHERE course_id = $2 AND user_id = $1)', [sessionKey, course_id], (err, result) => {

            if (err) {
                res.status(500).send();
            }
            if (result.rowCount === 0) {
                res.status(400).send();
            }
            res.status(200).send();
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.delete('/:course_id', (req, res) => {
    //let token = req.headers['x-access-token'];

    let course_id = req.params.course_id;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;
        db.query('DELETE from draft_courses WHERE user_id = $1 AND course_id = $2', [sessionKey, course_id], (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send();
            }
            res.status(200).send();
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.put('/', (req, res) => {
    //let token = req.headers['x-access-token'];

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwic2Vzc2lvbktleSI6MSwiYWRtaW4iOnRydWV9.DYshzaq1z5c1WrdGEpbgz4i-DcYxByTK_D0oJQbLkAU";
    try {
        let sessionKey = jwt.decode(token).sessionKey;
        let course_id = req.body.course_id;
        let active_group_id = req.body.active_group_id;
        let active_lecturer_id = req.body.active_lecturer_id;
        let locked_group_id = req.body.locked_group_id;
        let locked_lecturer_id = req.body.locked_lecturer_id;

        db.query('UPDATE draft_courses SET locked_group_id = $3,  locked_lecturer_id = $4, ' +
            'active_group_id = $5, active_lecturer_id = $6 WHERE user_id = $1 AND course_id = $2',
            [sessionKey, course_id, locked_group_id, locked_lecturer_id, active_group_id, active_lecturer_id], (err, result) => {

            if (err) {
                res.status(500).send();
            }
            if (result.rowCount === 0) {
                res.status(400).send();
            }
            res.status(200).send();
        });
    }
    catch (e) {
        res.status(400).send();
    }
});

router.get('/:in/:id', (req, res) => {
    let string = req.params.in;
    let id = req.params.id;

    let b = string.split(" ");
    let c = ["E", "T", "K", "N", "R", "L", "P"];

    let day = parseInt(c.indexOf(b[0])+1);

    let timeStart = b[1].replace(".", ":");
    let timeEnd = b[3].replace(".", ":");
    let week = b[5];
    let weeks = [];

    let e = week.split(",");
    for (let i = 0; i < e.length; i++) {

        let index = e[i].indexOf("-");
        if (index !== -1){
            let start = parseInt(e[i].slice(0, index));
            let end = parseInt(e[i].slice(index+1));
            for (start; start <= end; start++) {
                weeks.push(start);
            }
        }
        else{
            weeks.push(parseInt(e[i]));
        }
    }

    let max = 1;
    db.query("select id from ois1.occurrence_time order by id desc", (err, result) => {
        max = result.rows[0].id ;

        for (let i = 0; i < weeks.length; i++) {
            max = max + 1;
            db.query("INSERT INTO ois1.occurrence_time (id, day, start_time, end_time, week, occurrence_id)\n" +
                "VALUES ($1, $2, $3, $4, $5, $6)", [max, day, timeStart, timeEnd, weeks[i], id], (err, result) => {
                if (err) {
                    res.send(err);
                }
            });

        }
        res.send("TEHTUD");
    });
});

module.exports = router;