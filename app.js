var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models'),
  query = require('./app/dbhelpers').query,
  app = express();

require('./config/express')(app, config);
        app.listen(config.port, config.ip);
        console.log("Started app at : " + config.ip + ":" + config.port)
        
module.exports = app
