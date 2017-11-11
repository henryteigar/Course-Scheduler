const express = require('express');
const router = express.Router();
const db = require('../db/init.js');
const courses = require('./../db/DAOs/coursesDAO.js')


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
    let sessionKey = req.headers['session-key'];

    //Input params
    let input_query = req.query.q;
    let input_faculty = req.query.faculty;
    let input_institute = req.query.institute;
    let input_year = req.query.year;
    let input_semester = req.query.semester;
    let input_schedule = req.query.schedule;
    let input_levelOfStudy = req.query.level_of_study;
    let input_assessment = req.query.assessment;
    let input_currentlyOpened = req.query.currently_opened;
    let input_ids = req.query.ids;
    let statement = courses.getCourses(input_query, input_faculty, input_institute, input_year, input_semester,
        input_schedule, input_levelOfStudy, input_assessment, input_currentlyOpened, input_ids);

    db.query(statement.query_text, statement.parameters, (err, result) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });

});


router.get('/registered-courses', (req, res) => {

    let sessionKey = req.headers['session-key'];
    let statement = courses.getRegisteredCourses(sessionKey);
    db.query(statement.query_text, statement.parameters, (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(result.rows);
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