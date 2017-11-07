const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateMiddleware() {
    return function (req, res, next) {
        let token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (!err) {
                    next();
                }
                else {
                    res.sendFile(path.resolve('login'));
                }
            });
        } else {
            res.sendFile(path.resolve('login'));
        }
    }
}

module.exports.mustBeLoggedIn = authenticateMiddleware();