const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is our API")
});

router.get('/janar', (req, res) => {
    res.send("yo")
});

module.exports.router = router;