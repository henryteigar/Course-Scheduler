const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let body = [];
    res.status(200).send(body);
});

module.exports = router;