const express = require('express');
const router = express.Router();

const user = require('./user.js');
const drafts = require('./drafts.js');
const courses = require('./courses.js');
const login = require('./login.js');
const registeredCourses = require('./registered-courses.js');

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.use('/user', user);

router.use('/login', login);

router.use('/drafts', drafts);

router.use('/courses', courses);

//router.use('/registered-courses', registeredCourses);

module.exports.router = router;