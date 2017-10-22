const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const cors        = require('cors');
const api         = require('./routes/api');

require('dotenv').config();


// MIDDLEWARE
// =======================================
app.use(cors({credentials: true, origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://course-scheduler.me',
    'http://course-scheduler.me:3000',
    'https://course-scheduler.me'
]}));
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
