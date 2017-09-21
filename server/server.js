const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');

const api = require('./routes/api');


// MIDDLEWARE
// =======================================
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use('/api', api.router);


// ROUTES
// =======================================
app.get('/', (req,res) => {
    res.send("yo");
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// START THE Server
// =======================================
port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});