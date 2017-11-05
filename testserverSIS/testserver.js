const express     = require('express');
const app         = express();
const api         = require('./routes/api');


app.use('/api', api.router);


// START THE Server
// =======================================
port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});
