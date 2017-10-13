const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');

const api = require('./routes/api');


// MIDDLEWARE
// =======================================
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use('/api', api.router);


// ROUTES
// =======================================
app.get('/', (req,res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../client/index.html')));
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../client/index.html')));
});

// START THE Server
// =======================================
port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});
