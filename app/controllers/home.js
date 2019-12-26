var express = require('express'),
  router = express.Router();
var path = require('path');
var fs = require('fs');
var fetch = require('node-fetch');
var config = require('../../config/config');
module.exports = function(app) {
  app.use('/', router);
};

router.get('/job', function(req, res, next) {

    var quries = ''
    if (req.query.title != undefined && req.query.title != ''){
        quries += '&k='+ req.query.title
    }
    if (req.query.country != undefined && req.query.country != ''){
        quries += '&country='+ req.query.country
    }else{
      quries += '&country=us'
    }
    var qurl = config.neuvooUrl+quries
      qurl += ''
        console.log(qurl)
    fetch(qurl)
      .then(response => response.json())
      .then(data => {

           res.json({'msg': "success", 'data': data});
      })
      .catch(err => {
        res.json({'msg': "error", 'data': err});
      })


});

router.get('/', function(req, res, next) {

    user =  req.session.user || null
    res.render('index', {
        title: 'Dashboard',
        user : user
    });
});

