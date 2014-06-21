var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var app = express();

var parser = new xml2js.Parser();

app.use(cors());

app.get('/', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body); // Print the google web page.
        parser.parseString(body, function (err, result) {
        console.log('Done');
        var converted = JSON.stringify(result, undefined, 2);
        console.log(converted);
        res.set('Content-Type', 'application/json');
        res.send(converted);
        });
      }
    });
});

app.get('/pretty', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body); // Print the google web page.
        parser.parseString(body, function (err, result) {
        console.log('Done');
        var converted = JSON.stringify(result, undefined, 2);
        console.log(converted);
        res.set('Content-Type', 'application/json');
        res.send( "<pre>" + converted + "</pre>");
        });
      }
    });
});

app.get('/exhibits/:exhibit', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body); // Print the google web page.
        parser.parseString(body, function (err, result) {
        var converted = JSON.stringify(result, undefined, 2);
        console.log(converted);
        res.set('Content-Type', 'application/json');
        res.send(converted);
        });
      }
    });
});


var port = Number(process.env.PORT || 3000);
console.log("Listening on Port" + port);
app.listen(port);
