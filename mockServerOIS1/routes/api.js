const express = require('express');
const router = express.Router();
const randomString = require("randomstring");


router.get('/', (req, res) => {
    res.send("This is test server API")
});

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === "demo" && password === "demo") {
        var token = randomString.generate(20);
        res.status(200).json({ token });
    }
    else {
        res.status(404).send();
    }
});

module.exports.router = router;