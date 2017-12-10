const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/init.js');
const mockOis1Converter = require('../lib/mock_ois1_converter');
const format = require('pg-format');


router.get('/', (req, res) => {
    let token = req.headers['x-access-token'];
    try {
        let sessionKey = jwt.decode(token).session_key;
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
    let token = req.headers['x-access-token'];
    let course_id = req.params.course_id;
    try {
        let sessionKey = jwt.decode(token).session_key;
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
    let token = req.headers['x-access-token'];
    let course_id = req.params.course_id;
    try {
        let user_id = jwt.decode(token).session_key;

        db.query('SELECT id FROM draft_courses WHERE user_id = $1 AND course_id = $2', [user_id, course_id], (err, result) => {
            if (err) {
                res.status(500).send();
            }
            else {
                let draft_courses_id = result.rows[0].id;
                db.query('DELETE from draft_courses_locked_groups WHERE draft_courses_id = $1', [draft_courses_id], (err, result) => {

                if (err) {
                    console.log(err);
                    res.status(500).send();
                }
                db.query('DELETE from draft_courses WHERE user_id = $1 AND course_id = $2', [user_id, course_id], (err, result) => {

                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    }
                    res.status(200).send();
                });
            });
            }
        });


    }
    catch (e) {
        res.status(400).send();
    }
});

router.put('/', (req, res) => {
    let token = req.headers['x-access-token'];
    try {
        let user_id = jwt.decode(token).session_key;
        let course_id = req.body.course_id;
        let active_group_id = req.body.active_group_id;
        let locked_groups = req.body.locked_groups;

        db.query('UPDATE draft_courses SET active_group_id = $1 WHERE user_id = $2 AND course_id = $3',
            [active_group_id, user_id, course_id], (err, result) => {

            if (err) {
                res.status(500).send();
            }
            if (!result || result.rowCount === 0) {
                res.status(400).send();
            }
            db.query('SELECT id FROM draft_courses WHERE user_id = $1 AND course_id = $2', [user_id, course_id], (err, result) => {
                if (err) {
                    res.status(500).send();
                }
                else {
                    let draft_courses_id = result.rows[0].id;

                    db.query('DELETE FROM draft_courses_locked_groups WHERE draft_courses_id = $1', [draft_courses_id], (err, result) => {
                        if (err) {
                            res.status(500).send();
                        } else {
                            let values = locked_groups.map((group) => {
                                return [draft_courses_id, group.id];
                            });
                            let query = format('INSERT INTO draft_courses_locked_groups (draft_courses_id, group_id) VALUES %L', values);
                            db.query(query, [], (err, result) => {

                                if (err) {
                                    res.status(500).send();
                                }
                                res.status(200).send();
                            });
                        }
                    })
                }
            });
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