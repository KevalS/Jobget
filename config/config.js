var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  port = process.env.PORT || 8000,
  ip = process.env.IP || 'localhost',
  test = require('assert'),
    url = 'mongodb://localhost:27017',
  neuvooUrl = "http://neuvoo.com/services/api-new/search?ip=1.1.1.1&useragent=123asd&l=vancouver&contenttype=sponsored&format=json&publisher=dc134fad&cpcfloor=1";

config = {
    root: rootPath,
    app: {
        name: 'jobget'
    },
    neuvooUrl: neuvooUrl,
    port: port,
    ip: ip,
    db: url,
}

module.exports = config;
