const express     = require('express');
const app         = express();
const api         = require('./routes/api');
const bodyParser  = require('body-parser');

app.use(bodyParser.json());

app.use('/api', api.router);


// START THE Server
// =======================================
port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});
