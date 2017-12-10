const express = require('express');
const router = express.Router();
const db = require('../db/init.js');
const courses = require('./../db/DAOs/coursesDAO.js');


router.get('/', (req, res) => {
    res.send("This is test server API")
});

router.get('/user', (reg, res) => {
    let sessionKey = reg.headers['session-key'];
    db.query('SELECT * from ois1.v_users where id = $1', [sessionKey], (err, result) => {

        if (err) {
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });

});

router.get('/courses', (req, res) => {

    //Input params
    let input_query = req.query.q;
    let input_filter = req.query.filter;
    let input_lang = req.query.lang;
    let input_faculty = req.query.faculty;
    let input_institute = req.query.institute;
    let input_year = req.query.academic_year;
    let input_semester = req.query.semester;
    let input_schedule = req.query.schedule;
    let input_levelOfStudy = req.query.level_of_study;
    let input_assessment = req.query.assessment;
    let input_currentlyOpened = req.query.currently_opened;
    let input_ids = req.query.ids;
    let input_start = req.query.start;
    if (input_start === undefined) {
        input_start = 0;
    }
    let input_end = req.query.end
    if (input_end !== undefined) {
        input_end -= input_start;
    }
    let sessionKey = req.headers['session-key'];

    let statement = courses.getCourses(input_query, input_filter, input_lang, input_faculty, input_institute, input_year, input_semester,
        input_schedule, input_levelOfStudy, input_assessment, input_currentlyOpened, input_ids, input_start, input_end, sessionKey);

    db.query(statement.query_text, statement.parameters, (err, result) => {
        if (err) {
            res.status(400).send();
        }
        else {
            res.status(200).send(result.rows);
        }
    });

});


router.get('/registered-courses', (req, res) => {

    let sessionKey = req.headers['session-key'];
    db.query('SELECT * FROM ois1.v_registered WHERE user_id = $1', [sessionKey], (err, result) => {
        if (err || !result) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result.rows);
        }
    });

});

router.get('/default-values', (req, res) => {

    db.query('SELECT * FROM ois1.v_default_values', (err, result) => {
        if (err || !result) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result.rows);
        }
    });

});

router.post('/registered-courses', (req, res) => {

    let sessionKey = req.headers['session-key'];
    let course_id = req.body.course_id;
    let group_id = req.body.group_id;
    db.query('INSERT INTO ois1.registered_courses (user_id, course_id, group_id) ' +
        'SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM ois1.registered_courses ' +
        'WHERE course_id = $2 AND user_id = $1)', [sessionKey, course_id, group_id], (err, result) => {
        if (err) {
            res.status(500).send();
        }
        else if (!result || result.rowCount === 0) {
            res.status(400).send();
        }
        else {
            res.status(200).send();
        }
    });
});


router.delete('/registered-courses', (req, res) => {

    let sessionKey = req.headers['session-key'];
    let course_id = req.body.course_id;
    db.query('DELETE from ois1.registered_courses ' +
        'WHERE user_id = $1 AND course_id = $2', [sessionKey, course_id], (err, result) => {
        if (err) {
            res.status(500).send();
        }
        else {
            res.status(200).send();
        }
    });
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    db.query('SELECT id AS session_key from ois1.users WHERE username = $1 AND password = $2', [username, password], (err, result) => {
        if (!result || err || result.rowCount === 0) {
            res.status(401).send();
        }
        else {
            res.status(200).send(result.rows[0]);
        }
    });
});

module.exports.router = router;