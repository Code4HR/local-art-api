var fs = require('fs');
var xml2js = require('xml2js');
var request = require('request');
var express = require('express');
var _ = require('lodash');
var cors = require('cors');
var app = express();

var parser = new xml2js.Parser();
var mongoose = require('mongoose');
app.use(cors());


//var Art = require('./model/exhibit.js');
var Art = require('./data/exhibits.json');

app.get('/', function(req, res){
  res.redirect(301, '/exhibits');
 });

app.get('/pretty', function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parser.parseString(body, function (err, result) {
        var converted = JSON.stringify(result, undefined, 2);
        //print pretty
        console.log(converted);
        res.set('Content-Type', 'application/json');
        res.send( "<pre>" + converted + "</pre>");
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
});


//exhibits
/* Query Strings to search for ...
    id: DS.attr('number'),
    title: DS.attr('string'),
    location: DS.attr('string'),
    artists: DS.attr('string'),
    latitude: DS.attr('number'),
    longitude: DS.attr('number'),
*/
app.get('/exhibits', cors(), function(req, res){
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var obj = [];
        parser.parseString(body, function (err, result) {
        _.each(result.parks.parkz, function (data) {
          obj.push(data.$);
        });
          res.set('Content-Type', 'application/json');
          res.send(obj);
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
});

app.get('/exhibits/:id', cors(), function(req, res){
  //parm id
  var id = req.params.id;
  request('http://www.norfolkva.gov/cultural_affairs/public_art_downtown.xml',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var obj;
          parser.parseString(body, function (err, result) {
          console.log(result.parks.parkz);
          obj = result.parks.parkz[id].$;
          res.set('Content-Type', 'application/json');
          res.send(obj);
        });
      }
      else {
        res.send(404,"Not found");
      }
    });
});

var port = Number(process.env.PORT || 5555);
console.log("Listening on Port " + port);
app.listen(port);
