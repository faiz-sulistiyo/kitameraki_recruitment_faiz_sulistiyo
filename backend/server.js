// fileName : server.js 
// Example using the http module
const express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000,
    bodyParser = require('body-parser')
    cors = require('cors');

const taskRoute = require('./routes/task.js');
const formSettingRoute = require('./routes/formSetting.js');

app.use(cors({
    origin: '*'
  }));
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/task', taskRoute);
app.use('/form-settings', formSettingRoute);

// Specify the port to listen on
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


