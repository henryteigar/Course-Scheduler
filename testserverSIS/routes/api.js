const express = require('express');
const router = express.Router();
const randomString = require("randomstring");


router.get('/', (req, res) => {
    res.send("This is test server API")
});

router.get('/login/:username&:password', (req, res) => {
    console.log("Tuli päring")
    let name = req.params.username;
    let pass = req.params.password;

    if (name === "test" && pass === "test123") {
        console.log('Õiged andmed')
        var token = randomString.generate(5);
        res.status(200).json({ token });
    }
    else {
        return console.log('Valed andmed');
    }
});

module.exports.router = router;