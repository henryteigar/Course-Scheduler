const express = require('express');
const router = express.Router();
const db = require('../db/init.js')
const users = require('./users.js');


router.get('/', (req, res) => {
    res.send("This is our API")
});

router.use('/users', users);

/*
TODO
* Tuleb kasutusele võtta mingisugune query builder, et saaks lihtsamini querysid ehitada
* Tuleb backend struktuuti muuta, et ei peaks igas failis sisselogima. Vaatasin, et sisselogimise saab teha automaatseks ENV parameetritega.
* Loogika tuleb eraldada teistesse failidesse. Enpoint failides kasutada väga vähest loogikat.
* Küsimuste korral pöördu Henry poole.
 */
router.get('/courses', (req, res) => {

    //Input params
    let input_query = req.query.q;
    let input_filter = req.query.filter;

    //SQLQuery and parameters
    let query = "SELECT *, TO_CHAR(cancellation_date, 'DD.MM.YYYY') AS cancellation_date FROM subjects WHERE 1=1";
    let parameters = [];

    if (input_query !== undefined && input_query !== '*' && input_query !== '') {
        query += " AND LOWER(title) LIKE $" + (parameters.length + 1);
        parameters.push('%' + input_query.toLowerCase() + '%')
    }

    if (input_filter !== undefined) {
        query += " AND subject_type LIKE $" + (parameters.length + 1);
        parameters.push('%' + input_filter + '%');
    }

    db.query(query, parameters, (err, result) => {
        if (err) {
            return console.log('ERROR ', err);
        }
        res.send(result.rows);
    });
});

module.exports.router = router;